const Service = require('@aws-ee/services-container/lib/service');

const notAuthenticated = claims => ({ ...claims, authenticated: false });
const authenticated = claims => ({ ...claims, authenticated: true });

module.exports = class AuthenticationService extends Service {
  constructor() {
    super();
    this.dependency(['jwtService']);
  }

  /**
   * type AuthenticationResult = AuthenticationSuccess | AuthenticationFailed;
   * type AuthenticationSuccess = {
   *   authenticated: true
   *   verifiedToken: Object
   *   username: string
   * }
   * type AuthenticationError = {
   *   authenticated: false
   *   error: Error | string
   *   username?: string
   * }
   *
   * @returns AuthenticationResult
   */
  // TODO return username even if authentication fails.
  async authenticate(token) {
    const jwtService = await this.service('jwtService');
    if (!token) {
      return notAuthenticated({ error: 'empty token' });
    }

    let claims;
    try {
      claims = jwtService.verify(token);
    } catch (error) {
      return notAuthenticated({ error: `jwt decode error: ${error.toString()}` });
    }
    return authenticated(claims);
  }
};
