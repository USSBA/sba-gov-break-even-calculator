---
inject: true
to: backend/src/lambdas/api-handler/register-services.js
before: Register Insertion Point
---
  container.register('<%= h.changeCase.camel(name) %>Service', new <%= h.changeCase.ucFirst(h.changeCase.camel(name)) %>Service());