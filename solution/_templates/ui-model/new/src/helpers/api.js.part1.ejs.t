---
inject: true
to: ui/src/helpers/api.js
before: API Functions Insertion Point
---
function get<%= h.changeCase.ucFirst(h.changeCase.camel(h.inflection.pluralize(name))) %>() {
  return httpApiGet('api/<%= h.changeCase.kebab(h.inflection.pluralize(name)) %>');
}

function get<%= h.changeCase.ucFirst(h.changeCase.camel(name)) %>(id) {
  return httpApiGet(`api/<%= h.changeCase.kebab(h.inflection.pluralize(name)) %>/${id}`);
}
