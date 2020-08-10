const aws = require('aws-sdk');

/**
 * A utility function to construct AWS SDK client for various services.
 * The function configures various options and optionally loads credentials
 * based on aws credentials profile. If no profile is specified then it
 * constructs the client without explicitly specified profile to allow the
 * client to credentials from the default credentials chain
 *
 * @param whichClient
 * @param awsProfile
 * @param options
 */
function createAwsSdkClient(whichClient, awsProfile, options = {}) {
  options.maxRetries = options.maxRetries || 3;
  options.sslEnabled = true;

  // if a an AWS SDK profile has been configured, use its credentials
  if (awsProfile) {
    const credentials = new aws.SharedIniFileCredentials({ profile: awsProfile });
    options.credentials = credentials;
  }
  return new aws[whichClient](options);
}

/**
 * A function to return some context information about the AWS account being
 * accessed by the caller.
 *
 * @param awsProfile
 * @param awsRegion
 * @returns {Promise<{awsAccountId: *}>}
 */
async function getAwsAccountInfo(awsProfile, awsRegion) {
  const stsClient = createAwsSdkClient('STS', awsProfile, { apiVersion: '2011-06-15', region: awsRegion });
  const response = await stsClient.getCallerIdentity().promise();
  return {
    awsAccountId: response.Account,
  };
}
module.exports = { getAwsAccountInfo };
