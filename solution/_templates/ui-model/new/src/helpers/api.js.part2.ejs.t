---
inject: true
to: ui/src/helpers/api.js
before: API Export Insertion Point
---
  get<%= h.changeCase.ucFirst(h.changeCase.camel(h.inflection.pluralize(name))) %>,
  get<%= h.changeCase.ucFirst(h.changeCase.camel(name)) %>,