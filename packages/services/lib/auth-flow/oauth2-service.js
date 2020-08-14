const Service = require('@aws-ee/services-container/lib/service');

const settingKeys = {
  appClientId: 'appClientId',
  corsWhiteList: 'corsWhiteList',
  corsWhiteListLocal: 'corsWhiteListLocal',
  envType: 'envType',
};

class OAuth2Service extends Service {
  constructor() {
    super();
    this.dependency('jwtService');
    this.boom.extend(['notImplemented', 501]);

    // https://openid.net/specs/openid-connect-core-1_0.html#StandardClaims
    this._samlToWebTokenMap = {
      Sid: 'sid',
      Email: 'email',
      GivenName: 'given_name',
      Surname: 'family_name',
      MobilePhone: 'mobile_phone',
      OtherPhone: 'other_phone',
      Roles: 'roles',
    };
  }

  async init() {
    this._jwtService = await this.service('jwtService');
  }

  /**
   * Validation properties/methods
   */
  get validRedirectUris() {
    // Build list of app URLs that are acceptible redirect URLs
    const appUris = [...this.settings.getObject(settingKeys.corsWhiteList)];
    if (this.settings.get(settingKeys.envType)) {
      appUris.push(...this.settings.getObject(settingKeys.corsWhiteListLocal));
    }
    return appUris;
  }

  validateLoginParams(clientId, redirectUri, responseType) {
    // Validate responseType
    if (responseType === 'code') {
      throw this.boom.notImplemented('Authorization code grant not implemented', true);
    } else if (responseType !== 'token') {
      throw this.boom.badRequest('Invalid response_type', true).withPayload(responseType);
    }

    // Validate redirectUri and clientId
    if (!this.validRedirectUris.includes(redirectUri) || clientId !== this.settings.get(settingKeys.appClientId)) {
      throw this.boom.badRequest('Invalid client_id or redirect_uri', true);
    }
  }

  validateLogoutParams(postLogoutRedirectUri) {
    if (!this.validRedirectUris.includes(postLogoutRedirectUri)) {
      throw this.boom.badRequest('Invalid post_logout_redirect_uri', true).withPayload(postLogoutRedirectUri);
    }
  }

  /**
   * Utility Methods
   */
  mapSamlToWebTokenClaims(samlAttrs, samlToWebTokenMap) {
    return Object.entries(samlToWebTokenMap).reduce((allClaims, [samlClaim, webTokenClaim]) => {
      const updatedClaims = { ...allClaims };
      if (samlClaim in samlAttrs && samlAttrs[samlClaim]) {
        updatedClaims[webTokenClaim] = samlAttrs[samlClaim];
      }
      return updatedClaims;
    }, {});
  }

  buildAddressClaim(samlAttrs) {
    // https://openid.net/specs/openid-connect-core-1_0.html#AddressClaim
    const samlToWebTokenAddressMap = {
      StreetAddress: 'street_address',
      Locality: 'locality',
      StateOrProvince: 'region',
      PostalCode: 'postal_code',
      Country: 'country',
    };

    return this.mapSamlToWebTokenClaims(samlAttrs, samlToWebTokenAddressMap);
  }

  /**
   * Public Methods
   */
  generateIdToken(clientId, samlAttrs) {
    // Build claims
    const claims = this.mapSamlToWebTokenClaims(samlAttrs, this._samlToWebTokenMap);
    const addressClaim = this.buildAddressClaim(samlAttrs);
    if (Object.keys(addressClaim).length !== 0) {
      claims.address = addressClaim;
    }
    claims.aud = clientId;

    // Parse roles claim if available
    if ('roles' in claims) {
      claims.roles = JSON.parse(claims.roles);
      claims.roles = claims.roles.filter(role => {
        return role.RoleName === 'Lender Request';
      });
    }

    if (!('roles' in claims) || !claims.roles) {
      throw this.boom.forbidden('Invalid Roles');
    } else {
      // Build and sign token
      const jwtOptions = { subject: samlAttrs.nameID};
      const idToken = this._jwtService.sign(claims, jwtOptions);

      // Decode token to get relative expiration
      const decodedToken = this._jwtService.decode(idToken);
      const expiresIn = decodedToken.exp - decodedToken.iat;

      // Return token and expiration
      return { idToken, expiresIn };
    }
  }
}

module.exports = OAuth2Service;
