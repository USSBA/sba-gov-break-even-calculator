---
inject: true
to: post-deployment/src/lambdas/post-deployment/register-steps.js
before: Top Requires Insertion Point
---
const <%= h.changeCase.ucFirst(h.changeCase.camel(name)) %> = require('./steps/<%= h.changeCase.paramCase(name) %>');