---
inject: true
to: backend/config/settings/.defaults.yml
before: Settings Dynamo DB Insertion Point
---
# DynamoDB table name for <%= h.changeCase.ucFirst(h.changeCase.camel(h.inflection.pluralize(name))) %>
dbTable<%= h.changeCase.ucFirst(h.changeCase.camel(h.inflection.pluralize(name))) %>: ${self:custom.settings.dbTablePrefix}-Db<%= h.changeCase.ucFirst(h.changeCase.camel(h.inflection.pluralize(name))) %>
