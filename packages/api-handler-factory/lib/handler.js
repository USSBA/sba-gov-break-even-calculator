const _ = require('lodash');
const express = require('express');
const serverless = require('serverless-http');
const compression = require('compression');
const bodyParser = require('body-parser');
const cors = require('cors');
const ServicesContainer = require('@aws-ee/services-container/lib/services-container');

const errorHandler = require('./error-handler');
const AppContext = require('./app-context');

let cachedHandler;

// app = an express instance (required)
// registerServices = fn (required)
// registerController = fn (required)
function handlerFactory({ registerServices, registerControllers }) {
  return async (event, context) => {
    if (cachedHandler) return cachedHandler(event, context);

    const apiRouter = express.Router();
    const app = express();
    app.disable('x-powered-by');

    // register services
    const servicesContainer = new ServicesContainer(['settings', 'log']);
    registerServices(servicesContainer);
    await servicesContainer.initServices();

    // check circular dependencies
    const servicesList = servicesContainer.validate();

    // resolve settings and log services
    const logger = await servicesContainer.find('log');
    const settingsService = await servicesContainer.find('settings');

    // create app context
    const appContext = new AppContext({ app, settings: settingsService, log: logger, servicesContainer });

    // register controllers
    await registerControllers(appContext, apiRouter);

    // setup CORS, compression and body parser
    // TB-5 removed by AWS suggestion
    // const isDev = settingsService.get('envType') === 'dev';
    const whitelist = settingsService.optionalObject('corsWhitelist', []);
    // if (isDev) whitelist = _.concat(whitelist, settingsService.optionalObject('corsWhitelistLocal', []));
    const corsOptions = {
      origin: (origin, callback) => {
        if (whitelist.indexOf(origin) !== -1) {
          callback(null, true);
        } else {
          callback(null, false);
        }
      },
      optionsSuccessStatus: 200, // some legacy browsers (IE11, various SmartTVs) choke on 204
    };

    app.use(compression());
    app.use(cors(corsOptions));
    app.use(bodyParser.json({ limit: '50mb' })); // see https://stackoverflow.com/questions/19917401/error-request-entity-too-large
    app.use(bodyParser.urlencoded({ limit: '50mb', extended: true })); // for parsing application/x-www-form-urlencoded

    // mount all routes under /
    app.use('/', apiRouter);

    // add global error handler
    app.use(errorHandler());

    // allow options for all
    app.options('*');

    // prepare the handler
    cachedHandler = serverless(app, {
      callbackWaitsForEmptyEventLoop: true,
      request(req, { requestContext = {} }) {
        // expose the lambda event request context
        req.context = requestContext;
      },
    });

    // print useful information
    // const settingsList = settingsService.entries;

    // logger.info('Settings available are :');
    // logger.info(settingsList);
    //
    // logger.info('Services available are :');
    // logger.info(servicesList);

    return cachedHandler(event, context);
  };
}

module.exports = handlerFactory;
