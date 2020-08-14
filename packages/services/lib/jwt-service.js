const Service = require('@aws-ee/services-container/lib/service');
const jwt = require('jsonwebtoken'); // https://github.com/auth0/node-jsonwebtoken/tree/v8.3.0
const _ = require('lodash');

const settingKeys = {
  paramStoreJwtSecret: 'paramStoreJwtSecret',
  jwtOptions: 'jwtOptions',
};

function removeNils(obj) {
  return _.transform(
    obj,
    (result, value, key) => {
      if (!_.isNil(value)) {
        result[key] = value;
      }
    },
    {},
  );
}

class JwtService extends Service {
  constructor() {
    super();
    this.boom.extend(['invalidToken', 403]);
    this.dependency('aws');
  }

  async init() {
    await super.init();
    const keyName = this.settings.get(settingKeys.paramStoreJwtSecret);
    this.secret = await this.getSecret(keyName);
  }

  sign(payload, optionsOverride = {}) {
    const defaultOptions = this.settings.getObject(settingKeys.jwtOptions);

    // Create resultant options and remove Nil values (null or undefined) from the resultant options object.
    // This is done to allow removing an option using "optionsOverride"
    // For example, the defaultOptions "expiresIn": "2 days" but the we want to issue non-expiring token
    // we can pass optionsOverride with "expiresIn": undefined.
    // This will result in removing the "expiresIn" from the resultant options
    const options = removeNils(_.assign({}, defaultOptions, optionsOverride));
    return jwt.sign(payload, this.secret, options);
  }

  verify(token) {
    try {
      const payload = jwt.verify(token, this.secret);
      return payload;
    } catch (err) {
      throw this.boom.invalidToken('Invalid Token', true).cause(err);
    }
  }

  decode(token) {
    // Decodes WITHOUT verifying; only use if certain the token is valid
    const payload = jwt.decode(token);
    if (payload === null || typeof payload === 'string') {
      throw this.boom.internalError('Failed to properly decode token');
    }
    return payload;
  }

  async getSecret(keyName) {
    const aws = await this.service('aws');
    const ssm = new aws.sdk.SSM({ apiVersion: '2014-11-06' });
    this.log.info(`Getting the "${keyName}" key from the parameter store`);
    const result = await ssm.getParameter({ Name: keyName, WithDecryption: true }).promise();
    return result.Parameter.Value;
  }
}

module.exports = JwtService;
