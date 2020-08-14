---
to: ../packages/services/lib/schema/create-<%= h.changeCase.paramCase(name) %>.json
---
{
  "$schema": "http://json-schema.org/draft-07/schema#",
  "type": "object",
  "additionalProperties": false,
  "properties": {
    "id": {
      "type": "string",
      "minLength": 1,
      "maxLength": 100,
      "pattern": "^[A-Za-z0-9-_ ]+$"
    },
    "name": {
      "type": "string",
      "maxLength": 2048
    }
  },
  "required": ["id"]
}
