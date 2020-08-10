---
inject: true
to: backend/src/lambdas/api-handler/register-controllers.js
before: Top Requires Insertion Point
---
const <%= h.changeCase.camel(name) %>Controller = require('./controllers/<%= h.changeCase.kebab(name) %>-controller');