---
    to: ui/.serverless.yml
---
# For full config options, see docs.serverless.com
# Note that most settings in here come from config/settings/*.yaml
service: ${self:custom.settings.awsRegionShortName}-${self:custom.settings.solutionName}-ui

provider:
  name: aws
  runtime: nodejs12.x
  region: ${self:custom.settings.awsRegion}
  profile: ${self:custom.settings.awsProfile}
  stackName: ${self:custom.settings.envName}-${self:service}
  deploymentBucket:
    name: ${self:custom.settings.deploymentBucketName}
  # All references beginning with ${self:*, ${opt:*, ${file:*, ${deep:*, and ${cf:* will be resolved by Serverless
  # All other ${* references will be resolved by CloudFormation
  # See https://forum.serverless.com/t/getting-handle-accountid-in-serverless-config/946/11 and
  # See https://github.com/serverless/serverless/issues/5011
  variableSyntax: '\$\{((((self|opt|deep|cf|ssm):)|file)((?!\$\{).)+?)}'


custom:
  settings: ${file(./config/settings/.settings.js):merged}
  envTemplate: ${file(./config/environment/env-template.yml)}

resources:
   - Description: The UI stack for [${self:custom.settings.solutionName}] and env [${self:custom.settings.envName}]

plugins:
  - serverless-deployment-bucket
  - '@aws-ee/serverless-ui-tools'
