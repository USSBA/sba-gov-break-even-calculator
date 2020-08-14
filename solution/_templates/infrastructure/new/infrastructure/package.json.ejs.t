---
to: infrastructure/package.json
---

{
  "name": "@aws-ee/infrastructure",
  "version": "1.0.0",
  "private": true,
  "description": "The shared infrastructure for the PoC",
  "author": "aws-ee",
  "license": "SEE LICENSE IN LICENSE",
  "devDependencies": {
    "@aws-ee/serverless-settings-helper": "workspace:*",
    "serverless": "^1.63.0",
    "serverless-deployment-bucket": "^1.1.0"
  },
  "dependencies": {
    "serverless-s3-remover": "^0.6.0"
  }
}
