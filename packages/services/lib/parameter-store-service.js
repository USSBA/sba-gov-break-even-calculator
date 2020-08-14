const _ = require('lodash');
const Service = require('@aws-ee/services-container/lib/service');

const NodeCache = require('node-cache');

//stdTTL = default time to live for everything we add to cache in seconds
// See https://github.com/node-cache/node-cache
const cache = new NodeCache({ stdTTL: 60 }); // cache for 1 min

class ParameterStoreService extends Service {
  constructor() {
    super();
    this.dependency('aws');
  }

  async init() {
    await super.init();
    const aws = await this.service('aws');
    this._ssm = new aws.sdk.SSM({ apiVersion: '2014-11-06' });
  }

  async getParameter(parameterName, WithDecryption = false) {
    this.log.info({ type: 'getParameter', parameterName, msg: 'getting parameter' });
    const result = await this._ssm.getParameter({ Name: parameterName, WithDecryption }).promise();
    return result.Parameter.Value;
  }

  async getSecret(secretId) {
    return this.getParameter(secretId, true);
  }

  async putParameter(parameterName, parameterValue, parameterType = 'String') {
    this.log.info(`Creating a parameter store parameter with name "${parameterName}"`);
    return this._ssm
      .putParameter({
        Name: parameterName,
        Type: parameterType,
        Value: parameterValue,
      })
      .promise();
  }

  async getOptionalParameter(parameterName, defaultValue = '', WithDecryption = false) {
    try {
      const value = await this.getParameter(parameterName, WithDecryption);
      return value;
    } catch (e) {
      if (e.code === 'ParameterNotFound') {
        // if param not found then return default value
        return defaultValue;
      }
      // rethrow everything else
      throw e;
    }
  }

  async getCacheableParam(paramName, defaultValue = '', WithDecryption = false) {
    let value = cache.get(paramName);
    if (_.isNil(value)) {
      // cache miss
      value = await this.getOptionalParameter(paramName, defaultValue);
      cache.set(paramName, value);
    }
    return value;
  }
  async getCacheableSecret(paramName) {
    let value = cache.get(paramName);
    if (_.isNil(value)) {
      // cache miss
      value = await this.getSecret(paramName);
      cache.set(paramName, value);
    }
    return value;
  }
}

module.exports = ParameterStoreService;
