---
    to: ui/config/settings/.settings.js
---
module.exports.merged = require('@aws-ee/serverless-settings-helper').mergeSettings(__dirname, [
  '../../../../config/settings/.defaults.yml',
  './.defaults.yml',
  '../../../../config/settings/${stage}.yml',
  './${stage}.yml',
]);
