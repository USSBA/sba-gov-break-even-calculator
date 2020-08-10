const https = require('https');

const passportSaml = require('passport-saml');
const parseXmlString = require('xml2js').parseStringPromise;
const stripPrefix = require('xml2js').processors.stripPrefix;

const Service = require('@aws-ee/services-container/lib/service');

const settingKeys = {
  serviceProviderId: 'serviceProviderId',
  sbaConnectMetadataUrl: 'sbaConnectMetadataUrl',
  paramStoreSamlConfig: 'paramStoreSamlConfig',
};

let sbaConnectConfig;
class SamlService extends Service {
  constructor() {
    super();
    this.dependency('parameterStoreService');

    this._releasedAttrs = [
      'Sid',
      'NameIdentifier',
      'nameID',
      'GivenName',
      'Surname',
      'Email',
      'MobilePhone',
      'OtherPhone',
      'StreetAddress',
      'Locality',
      'StateOrProvince',
      'PostalCode',
      'Roles',
    ];
  }

  async init() {
    // Define Identity Provider and Service Provider config
    const { cert, login, logout } = await this.sbaConnectConfig();

    this._baseIdpConfig = {
      issuer: this.settings.get(settingKeys.serviceProviderId),
      authnRequestBinding: 'HTTP-Redirect',
      cert,
    };
    this._idpEntryPoints = { login, logout };
  }

  /**
   * Utility Methods
   */
  async sbaConnectConfig() {
    if (!sbaConnectConfig) {
      // Check Parameter Store for metdata
      const parameterStoreService = await this.service('parameterStoreService');
      const parameterName = this.settings.get(settingKeys.paramStoreSamlConfig);
      try {
        const configString = await parameterStoreService.getParameter(parameterName);
        sbaConnectConfig = JSON.parse(configString);
        return sbaConnectConfig;
      } catch (error) {
        this.log.warn({
          msg: 'Failed to retrieve SAML config from Parameter Store; requesting SAML metadata from SBA Connect',
          error,
        });
      }

      // Retrieve metadata
      try {
        const xmlMetadata = await new Promise((resolve, reject) => {
          https
            .get(this.settings.get(settingKeys.sbaConnectMetadataUrl), response =>
              response.on('data', data => resolve(data.toString())),
            )
            .on('error', error => reject(error));
        });

        // Convert metadata from XML to JSON
        const jsonMetadata = await parseXmlString(xmlMetadata, { tagNameProcessors: [stripPrefix] });

        // Parse metadata for SignOn/Logout URLs and signing certs
        const redirBindingFilter = endpoint =>
          endpoint.$.Binding === 'urn:oasis:names:tc:SAML:2.0:bindings:HTTP-Redirect';
        const idpSsoDescriptor = jsonMetadata.EntityDescriptor.IDPSSODescriptor[0];

        sbaConnectConfig = {
          login: idpSsoDescriptor.SingleSignOnService.find(redirBindingFilter).$.Location,
          logout: idpSsoDescriptor.SingleLogoutService.find(redirBindingFilter).$.Location,
          cert: idpSsoDescriptor.KeyDescriptor.filter(keyDescriptor => keyDescriptor.$.use === 'signing').map(
            keyDescriptor => keyDescriptor.KeyInfo[0].X509Data[0].X509Certificate[0],
          ),
        };
      } catch (error) {
        this.log.error({ msg: 'Failed to retrieve or parse SAML metadata from SBA Connect', error });
        throw error;
      }

      // Persist config to Parameter Store
      try {
        await parameterStoreService.putParameter(parameterName, JSON.stringify(sbaConnectConfig));
      } catch (error) {
        this.log.error({ msg: 'Failed to persist SAML metadata to Parameter Store', error });
      }
    }

    return sbaConnectConfig;
  }

  identityProvider(loginOrLogout, assertionConsumerUrl = null) {
    // Returns an instantiated version of passport-saml's SAML class
    if (!this._identityProvider) {
      const idpConfig = {
        ...this._baseIdpConfig,
        entryPoint: this._idpEntryPoints[loginOrLogout],
      };

      if (assertionConsumerUrl) {
        idpConfig.callbackUrl = assertionConsumerUrl;
      }

      this._identityProvider = new passportSaml.SAML(idpConfig);
    }
    return this._identityProvider;
  }

  static consumerUrlFromRequestedUrl(requestedUrl) {
    return requestedUrl.replace('/oauth2/authorize', '/saml2/idpresponse');
  }

  encodeRelayState(decodedRelayState) {
    return Buffer.from(JSON.stringify(decodedRelayState)).toString('base64');
  }

  decodeRelayState(encodedRelayState) {
    return JSON.parse(Buffer.from(encodedRelayState, 'base64').toString('ascii'));
  }

  /**
   * Public Methods
   */
  async generateAuthnRequest(requestedUrl, clientId, redirectUri, responseType) {
    // Define and encode Relay State
    const options = {
      additionalParams: {
        RelayState: this.encodeRelayState({
          clientId,
          redirectUri,
          responseType,
        }),
      },
    };

    // Generate and return auth URL with SAML request
    const assertionConsumerUrl = SamlService.consumerUrlFromRequestedUrl(requestedUrl);
    return new Promise((resolve, reject) =>
      this.identityProvider('login', assertionConsumerUrl).getAuthorizeUrl({}, options, (error, resultUrl) =>
        error
          ? reject(this.boom.internalError('Failed to generate authorization request').cause(error))
          : resolve(resultUrl),
      ),
    );
  }

  async generateLogoutRequest(requestedUrl, nameId, sessionIndex, postLogoutRedirectUri) {
    // Define and encode Relay State
    const options = {
      additionalParams: {
        RelayState: this.encodeRelayState({ redirectUri: postLogoutRedirectUri }),
      },
    };

    // Build mock Express request
    const mockRequest = {
      user: {
        nameID: nameId,
        nameIDFormat: 'urn:oasis:names:tc:SAML:2.0:nameid-format:persistent',
        sessionIndex,
      },
    };

    // Generate and return logout URL with SAML request
    return new Promise((resolve, reject) =>
      this.identityProvider('logout').getLogoutUrl(mockRequest, options, (error, resultUrl) =>
        error ? reject(this.boom.internalError('Failed to generate logout request').cause(error)) : resolve(resultUrl),
      ),
    );
  }

  async processResponse(samlResponse, encodedRelayState) {
    // Extract redirect URI and response type from Relay State
    const { clientId, redirectUri, responseType } = this.decodeRelayState(encodedRelayState);

    // Validate and parse SAML response
    const samlProfile = await new Promise((resolve, reject) =>
      this.identityProvider().validatePostResponse({ SAMLResponse: samlResponse }, (error, profile) =>
        error ? reject(error) : resolve(profile),
      ),
    );

    // Extract attributes from parsed SAML response
    const attributes = this._releasedAttrs.reduce((allAttrs, currAttr) => {
      const updatedAttrs = { ...allAttrs };
      if (currAttr in samlProfile && samlProfile[currAttr]) {
        updatedAttrs[currAttr] = samlProfile[currAttr];
      }
      return updatedAttrs;
    }, {});

    return { attributes, clientId, redirectUri, responseType };
  }
}

module.exports = SamlService;
