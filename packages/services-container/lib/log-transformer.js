const _ = require('lodash');

class LogTransformer {
  constructor(loggingContext = {}, fieldsToMask = ['x-amz-security-token', 'user', 'accessKey']) {
    this.loggingContext = loggingContext;
    this.fieldsToMask = fieldsToMask;
  }

  transformForInfo(logPayload) {
    return this.transform(logPayload, 'info');
  }

  transformForLog(logPayload) {
    return this.transform(logPayload, 'log');
  }

  transformForDebug(logPayload) {
    return this.transform(logPayload, 'debug');
  }

  transformForWarn(logPayload) {
    return this.transform(logPayload, 'warn');
  }

  transformForError(logPayload) {
    return this.transform(logPayload, 'error');
  }

  transform(logPayload, logLevel) {
    const transformedLogPayload = this.augment(this.maskDeep(logPayload, this.fieldsToMask), { logLevel });
    return transformedLogPayload;
  }

  /**
   * Augments the given data with standard logging metadata specified in the loggingContext
   * (such as 'envType', 'envName', 'appName', 'functionName') etc.
   *
   * @param data The raw data to be logged.
   * @param additionalContext Object containing additional logging contextual information as key, value pairs. This is in addition to the loggingContext.
   * The payload of this additionalContext and the loggingContext (specified at the time constructing the LoggingTransformer object) will be added to the raw logging data.
   *
   * @return {string} A transformed logging data along with additional information from the loggingContext and the additionalContext as string.
   */
  augment(data, additionalContext = {}) {
    let objToLog = {
      ...this.loggingContext,
      ...additionalContext,
    };

    if (_.isError(data)) {
      objToLog.msg = data.message;
      objToLog.stack = data.stack;
      // Merge any other fields from the error object to the target object to log
      objToLog = _.merge({}, objToLog, data);
    } else if (_.isArray(data)) {
      objToLog.msg = data;
    } else if (_.isObject(data)) {
      objToLog = _.merge({}, objToLog, data);
    } else {
      objToLog.msg = data;
    }
    return JSON.stringify(objToLog, null, 2);
  }

  /**
   * The function returns a new deep copy of the given object with the properties that are specified in the
   * keysToMask as masked
   * @param object The object to deep copy from
   * @param keysToMask The properties to be masked in the returned object
   * @return {*} A deep copy of the object with the specified properties masked as ****
   */
  maskDeep(object, keysToMask) {
    if (_.isError(object)) {
      // the javascript errors don't have fields that can be masked so just return the error as is
      return object;
    }

    function mask(_value, key) {
      if (keysToMask && _.indexOf(keysToMask, key) >= 0) {
        return '****';
      }
      return undefined;
    }

    return _.cloneDeepWith(object, mask);
  }
}

module.exports = LogTransformer;
