const _ = require('lodash');
const fs = require('fs-extra');
const path = require('path');
const chalk = require('chalk');
const aws = require('aws-sdk');

const { delay, formatObject } = require('./lib/utils');
const LambdasOverrider = require('./lib/lambdas-overrider');

const wf = '[workflow-offline]';

class BackendTools {
  constructor(serverless, options) {
    this.serverless = serverless;
    this.options = options;
    this.commands = {
      'workflow-offline': {
        usage: 'Runs workflow offline',
        lifecycleEvents: ['prepare', 'run'],
        options: {
          event: {
            usage: 'The path to an event json file. Example --event local-events/<username>-wf-event.json',
            required: false,
            shortcut: 'e',
          },
        },
      },
    };

    this.hooks = {
      'workflow-offline:prepare': this.workflowPrepare.bind(this),
      'workflow-offline:run': this.workflowRun.bind(this),
      'before:offline:start': this.resolveOverrides.bind(this), // event fired by serverless-offline
      'before:invoke:local:loadEnvVars': this.resolveOverrides.bind(this), // event fired by the invoke plugin
      'before:webpack:validate:validate': this.beforeWebpack.bind(this), // event fired by serverless-webpack
    };

    this.cli = {
      raw(message) {
        serverless.cli.consoleLog(chalk.dim(message));
      },
      log(prefix = '', message) {
        serverless.cli.consoleLog(`${prefix} ${chalk.yellowBright(message)}`);
      },
      warn(prefix = '', message) {
        serverless.cli.consoleLog(`${prefix} ${chalk.redBright(message)}`);
      },
    };

    this.lambdasOverrider = new LambdasOverrider({ serverless, options });
  }

  async resolveOverrides() {
    const awsInstance = this.prepareAws();
    return this.lambdasOverrider.overrideEnvironments({ aws: awsInstance });
  }

  async beforeWebpack() {
    const service = this.serverless.service;
    service.provider.environment = { ...service.provider.environment, WEBPACK_ON: true };
    this.cli.log('[backend-tools]', 'Setting environment variable WEBPACK_ON = true');
  }

  prepareAws() {
    const profile = this.serverless.service.custom.settings.awsProfile;
    const region = this.serverless.service.custom.settings.awsRegion;
    const credentials = new aws.SharedIniFileCredentials({ profile });

    // setup profile and region
    process.env.AWS_REGION = region;
    process.env.AWS_PROFILE = profile;

    aws.config.update({
      maxRetries: 3,
      region,
      sslEnabled: true,
      credentials,
    });

    return aws;
  }

  async workflowPrepare() {
    const service = this.serverless.service;
    const servicePath = this.serverless.config.servicePath;
    let event = {};

    // load event if it exists
    const eventPath = this.options['event']; // eslint-disable-line dot-notation
    if (!_.isEmpty(eventPath)) {
      const exists = await fs.pathExists(eventPath);
      if (!exists) throw new Error(`The event "${eventPath}" json file is not found`);
      this.cli.log(wf, `Reading the "${eventPath}" file as a json file`);
      event = await fs.readJson(eventPath);
    }

    await this.resolveOverrides();

    // figure out the lambda information that we need to run
    const runnerName = _.get(service.custom, 'backendTools.workflowLoopRunner', 'workflowLoopRunner');
    if (_.isUndefined(runnerName))
      throw new Error(
        'Please add the following section to your serverless.yaml file:\n  custom:\n   backendTools:\n        workflowRunner: <lambda name>',
      );

    const lambdaEntry = _.get(service.functions, runnerName);
    if (_.isEmpty(lambdaEntry))
      throw new Error(`"${runnerName}" lambda is not found in the 'functions' section of your serverless.yaml`);
    const handlerDir = path.dirname(lambdaEntry.handler);
    const handleExtension = path.extname(lambdaEntry.handler);
    const handlerMethodName = handleExtension.substr(1);
    const handlerName = path.basename(lambdaEntry.handler, handleExtension);
    const lambdaPath = `${path.join(servicePath, handlerDir, handlerName)}.js`;

    const localEnv = lambdaEntry.environment || {};
    const globalEnv = _.get(service, 'provider.environment', {});
    const mergedEnv = { ...globalEnv, ...localEnv };

    _.forEach(mergedEnv, (value, key) => {
      if (_.isObject(value)) {
        this.cli.warn(wf, `Environment variable "${key}" is not a string.  It won't be made available to lambda.`);
        delete mergedEnv[key];
      } else {
        process.env[key] = value;
      }
    });

    this.payload = {
      lambdaEntry,
      localEnv,
      globalEnv,
      mergedEnv,
      lambdaPath,
      handlerDir,
      handlerMethodName,
      handlerName,
      event,
    };
  }

  async workflowRun() {
    const { lambdaPath, handlerDir, handlerName, handlerMethodName, mergedEnv, event } = this.payload;
    this.cli.log(
      wf,
      `Using the following environment variables:\n${_.map(mergedEnv, (v, k) => `${k}=${v}`).join('\n')}`,
    );
    this.cli.log(wf, 'About to run the workflow');
    this.cli.log(wf, `Loading lambda "${lambdaPath}"`);

    const printEvent = givenEvent => this.cli.log('', `\n${formatObject(givenEvent)}\n`);
    const lambda = require(lambdaPath); // eslint-disable-line global-require, import/no-dynamic-require
    const context = {};
    let done = false;

    do {
      this.cli.log(wf, `Calling "${handlerDir}/${handlerName}.${handlerMethodName}"\n`);
      const result = await lambda[handlerMethodName](event, context); // eslint-disable-line no-await-in-loop
      this.cli.log('', '\nThe returned event is:');
      event.loop = result;
      printEvent(event);
      if (result.shouldWait) {
        this.cli.log(wf, `Waiting for ${result.wait} seconds`);
        await delay(result.wait); // eslint-disable-line no-await-in-loop
      } else if (result.shouldLoop) {
        // do nothing, so the loop can go back to run lambda
      } else {
        done = true;
      }
    } while (!done);

    this.cli.log(wf, 'Completed the workflow. The final event is:');
    printEvent(event);
  }
}

module.exports = BackendTools;
