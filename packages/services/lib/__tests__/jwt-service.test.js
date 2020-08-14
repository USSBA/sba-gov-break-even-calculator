const Service = require('@aws-ee/services-container/lib/service');
const SettingsService = require('@aws-ee/services-container/lib/services/env-settings');
const ServicesContainer = require('@aws-ee/services-container/lib/services-container');
const LoggerService = require('@aws-ee/services-container/lib/services/logger');
const staticSettingsProvider = require('../static-settings-provider');
const JwtService = require('../jwt-service');

class MockAWSService extends Service{

  async init() {
    await super.init();
    console.log('initializing AWS beep boop');
  }

  sdk = {
      SSM: jest.fn(() => {
        return {
          getParameter: jest.fn(() => {
            return {
              promise: () => {
                return {
                  Parameter: {
                    Value: 'abcdefghijklmonpqrstuvwxyz',
                  },
                };
              },
            };
          }),
        };
      }),
    }
}

describe('JWT Service Test', () => {
  const servicesContainer = new ServicesContainer(['settings', 'log']);
  const awsService = new MockAWSService();

  const jwToken = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiaWF0IjoxNTE2MjM5MDIyfQ.SflKxwRJSMeKKF2QT4fwpMeJf36POk6yJV_adQssw5c';
  const defaultPayload = { foo: 'bar', baz: 'biz', qux: 'quz' };

  beforeAll(async () => {
    process.env = Object.assign(process.env, {
      APP_dbTablePrefix: 'DB_TABLE_PREFIX',
      APP_paramStoreJwtSecret: 'paramStoreJwtSecret',
      APP_jwtOptions: '{"expiresIn":500}',
    });

    const settingsService = new SettingsService({
      provider: staticSettingsProvider,
    });
    const solutionName = 'lendergateway';
    const envType = 'test';
    servicesContainer.register('settings', settingsService);
    servicesContainer.register('log', new LoggerService(console, { solutionName, envType }), {
      lazy: false,
    });
    servicesContainer.register('aws', awsService);
    servicesContainer.register('jwtService', new JwtService());
    await servicesContainer.initServices();

  });

  it('should sign the payload and return a JWT', async () => {
    const jwtService = await servicesContainer.find('jwtService');

    const token = jwtService.sign(defaultPayload);
    expect(token.split('.').length).toEqual(3);
    // This should be constant
    expect(token.split('.')[0]).toEqual('eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9');
    const token2 = jwtService.sign({ bar: 'foo', biz: 'baz', quz: 'qux' });
    // New token, not equal to the first
    expect(token).not.toEqual(token2);

    // this is slightly circular, but it all needs to work
    actualPayload = jwtService.verify(token);

    // Do we get the right payload?
    expect(actualPayload).toEqual(expect.objectContaining(defaultPayload));
    // default expires in is 500 + the iat (issued at)
    expect(actualPayload.exp).toEqual(actualPayload.iat + 500);
  });

  it('should sign the payload and respect an override provided', async () => {
    const jwtService = await servicesContainer.find('jwtService');
    const token = jwtService.sign(defaultPayload, {expiresIn:1000});

    // this is slightly circular, but it all needs to work
    actualPayload = jwtService.verify(token);
    // Do we get the right payload?
    expect(actualPayload).toEqual(expect.objectContaining(defaultPayload));
    // This is overridden to be 1000, not 500
    expect(actualPayload.exp).toEqual(actualPayload.iat + 1000);
  });

  it('should sign the payload and remove an override provided', async () => {
    const jwtService = await servicesContainer.find('jwtService');
    const token = jwtService.sign(defaultPayload, {expiresIn:undefined});

    // this is slightly circular, but it all needs to work
    actualPayload = jwtService.verify(token);
    // Do we get the right payload?
    expect(actualPayload).toEqual(expect.objectContaining(defaultPayload));
    // This is overridden to be undefined, not 500
    expect(actualPayload.exp).toEqual(undefined);
  });

  it('should decline to verify a token from jwt.io', async () => {
   const jwtService = await servicesContainer.find('jwtService');
    let payload;
    // make sure we call the assertions in catch
    expect.assertions(3);
    try{
      payload = jwtService.verify(jwToken)

    } catch(err){
      expect(err).not.toBeUndefined();
      expect(err.code).toEqual('invalidToken');
    }
    expect(payload).toBeUndefined()
  });

  it('should decode a token from jwt.io', async () => {
    const jwtService = await servicesContainer.find('jwtService');

    const payload = jwtService.decode(jwToken);
    expect(payload).toEqual(expect.objectContaining({
      "sub": "1234567890",
      "name": "John Doe",
    }))
  })
});
