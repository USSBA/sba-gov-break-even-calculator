---
inject: true
to: post-deployment/src/lambdas/post-deployment/register-steps.js
before: Register Insertion Point
---
    ['<%= h.changeCase.camel(name) %>', new <%= h.changeCase.ucFirst(h.changeCase.camel(name)) %>()],