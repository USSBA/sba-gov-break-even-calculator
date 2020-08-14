---
inject: true
to: backend/config/infra/cloudformation.yml
before: RoleApiHandler DB Resource Insertion Point
---
                - !GetAtt [Db<%= h.changeCase.ucFirst(h.changeCase.camel(h.inflection.pluralize(name))) %>, Arn]