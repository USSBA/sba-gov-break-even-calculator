---
to: infrastructure/serverless.yml
---
# For full config options, see docs.serverless.com
# Note that most settings in here come from config/settings/*.yaml
service: ${self:custom.settings.awsRegionShortName}-${self:custom.settings.solutionName}-infrastructure

provider:
  name: aws
  runtime: nodejs12.x
  region: ${self:custom.settings.awsRegion}
  profile: ${self:custom.settings.awsProfile}
  stackName: ${self:custom.settings.envName}-${self:service}
  deploymentBucket:
    name: ${self:custom.settings.deploymentBucketName}
  stackTags: ${self:custom.tags}
  # All references beginning with ${self:*, ${opt:*, ${file:*, ${deep:*, and ${cf:* will be resolved by Serverless
  # All other ${* references will be resolved by CloudFormation
  # See https://forum.serverless.com/t/getting-handle-accountid-in-serverless-config/946/11 and
  # See https://github.com/serverless/serverless/issues/5011
  variableSyntax: '\$\{((((self|opt|deep|cf):)|file)((?!\$\{).)+?)}'

custom:
  default.aws.profile: '' # Keep default profile to use as empty string to force people to specify profile or use env
  settings: ${file(./config/settings/.settings.js):merged}
  tags:
    Name: ${self:custom.settings.envName}-${self:service}
  remover:
    buckets:
      - ${self:custom.settings.awsAccountInfo.awsAccountId}-${self:custom.settings.namespace}-artifacts
      - ${self:custom.settings.awsAccountInfo.awsAccountId}-${self:custom.settings.namespace}-website

resources:
   - Description: The infrastructure stack for [${self:custom.settings.solutionName}] and env [${self:custom.settings.envName}]
   - ${file(./config/infra/cloudformation.yml)}

plugins:
  - serverless-deployment-bucket
  - serverless-s3-remover
