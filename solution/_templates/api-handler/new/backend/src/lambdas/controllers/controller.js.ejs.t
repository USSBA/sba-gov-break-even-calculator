---
to: backend/src/lambdas/api-handler/controllers/<%= h.changeCase.kebab(name) %>-controller.js
---
// const _ = require('lodash');

async function configure(context) {
  const router = context.router();
  const wrap = context.wrap;
  const boom = context.boom;

  const <%= h.changeCase.camel(name) %>Service = await context.service('<%= h.changeCase.camel(name) %>Service');

  // ===============================================================
  //  GET / (mounted to /api/<%= h.changeCase.kebab(h.inflection.pluralize(name)) %>)
  // ===============================================================
  router.get('/', wrap(async (req, res) => {
    const requestContext = res.locals.requestContext;

    const result = await <%= h.changeCase.camel(name) %>Service.list(requestContext);
    res.status(200).json(result);
  }));

  // ===============================================================
  //  GET /:id (mounted to /api/<%= h.changeCase.kebab(h.inflection.pluralize(name)) %>)
  // ===============================================================
  router.get('/:id', wrap(async (req, res) => {
    const id = req.params.id;
    const requestContext = res.locals.requestContext;

    const result = await <%= h.changeCase.camel(name) %>Service.mustFind(requestContext, { id });
    res.status(200).json(result);
  }));

  // ===============================================================
  //  POST / (mounted to /api/<%= h.changeCase.kebab(h.inflection.pluralize(name)) %>)
  // ===============================================================
  router.post('/', wrap(async (req, res) => {
    const requestContext = res.locals.requestContext;
    const possibleBody = req.body;
    const result = await <%= h.changeCase.camel(name) %>Service.create(requestContext, possibleBody);

    res.status(200).json(result);
  }));

  // ===============================================================
  //  PUT /:id (mounted to /api/<%= h.changeCase.kebab(h.inflection.pluralize(name)) %>)
  // ===============================================================
  router.put('/:id', wrap(async (req, res) => {
    const id = req.params.id;
    const requestContext = res.locals.requestContext;
    const body = req.body || {};

    if (body.id !== id) throw boom.badRequest('The <%= name.toLowerCase() %> id provided in the url does not match the one in the submitted json object', true);

    const result = await <%= h.changeCase.camel(name) %>Service.update(requestContext, body);
    res.status(200).json(result);
  }));

  // ===============================================================
  //  DELETE /:id (mounted to /api/<%= h.changeCase.kebab(h.inflection.pluralize(name)) %>)
  // ===============================================================
  router.delete('/:id', wrap(async (req, res) => {
    const id = req.params.id;
    const requestContext = res.locals.requestContext;

    await <%= h.changeCase.camel(name) %>Service.delete(requestContext, { id });
    res.status(200).json({});
  }));

  return router;
}

module.exports = configure;
