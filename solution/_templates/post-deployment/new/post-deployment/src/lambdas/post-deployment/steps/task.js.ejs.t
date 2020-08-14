---
to: post-deployment/src/lambdas/post-deployment/steps/<%= h.changeCase.paramCase(name) %>.js
---
/* eslint-disable no-await-in-loop */
const Service = require('@aws-ee/services-container/lib/service');
const RequestContext = require('@aws-ee/services-container/lib/service');

class <%= h.changeCase.ucFirst(h.changeCase.camel(name)) %> extends Service {
  constructor() { // eslint-disable-line no-useless-constructor
    super();
    // TODO add all your dependencies here
    // this.dependency(['dbService']);
  }

  async init() {
    await super.init();
  }

  async execute() {
    // const [dbService] = await this.service(['dbService']);

    // TODO - do what you need to do here
    // const requestContext = getSystemRequestContext();
    // const result = await service.method(requestContext, ..);

  }
}

function getSystemRequestContext() { // eslint-disable-line no-unused-vars
  const ctx = new RequestContext();

  const systemUsername = '_system_';
  const systemUserNamespace = 'internal';

  ctx.authenticated = true;
  ctx.principal = { username: systemUsername, ns: systemUserNamespace, isAdmin: true };
  ctx.principalIdentifier = { username: systemUsername, ns: systemUserNamespace };

  return ctx;
}

module.exports = <%= h.changeCase.ucFirst(h.changeCase.camel(name)) %>;
