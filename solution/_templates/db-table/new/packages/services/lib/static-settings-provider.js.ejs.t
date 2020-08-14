---
inject: true
to: ../packages/services/lib/static-settings-provider.js
before: Db Insertion Point
---
    table('dbTable<%= h.changeCase.ucFirst(h.changeCase.camel(h.inflection.pluralize(name))) %>', 'Db<%= h.changeCase.ucFirst(h.changeCase.camel(h.inflection.pluralize(name))) %>');