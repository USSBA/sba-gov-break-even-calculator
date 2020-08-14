---
inject: true
to: backend/src/lambdas/api-handler/register-controllers.js
before: Routers Insertion Point
---
  router.use('/api/<%= h.changeCase.kebab(h.inflection.pluralize(name)) %>', setupAuthContext, prepareContext, await <%= h.changeCase.camel(name) %>Controller(context));