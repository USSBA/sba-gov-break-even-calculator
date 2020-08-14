---
inject: true
to: backend/src/lambdas/api-handler/register-services.js
before: Top Requires Insertion Point
---
const <%= h.changeCase.ucFirst(h.changeCase.camel(name)) %>Service = require('@aws-ee/services/lib/<%= h.changeCase.kebab(name) %>/<%= h.changeCase.kebab(name) %>-service');