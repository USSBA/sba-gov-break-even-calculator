---
inject: true
to: backend/config/infra/cloudformation.yml
before: Dynamo DB Insertion Point
---
  Db<%= h.changeCase.ucFirst(h.changeCase.camel(h.inflection.pluralize(name))) %>:
    Type: AWS::DynamoDB::Table
    Properties:
      TableName: ${self:custom.settings.dbTable<%= h.changeCase.ucFirst(h.changeCase.camel(h.inflection.pluralize(name))) %>}
      AttributeDefinitions:
        - AttributeName: 'id'
          AttributeType: 'S'
      KeySchema:
        - AttributeName: 'id'
          KeyType: 'HASH'
      ProvisionedThroughput:
        ReadCapacityUnits: '5'
        WriteCapacityUnits: '5'
