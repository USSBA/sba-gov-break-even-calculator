---
inject: true
to: ui/src/App.js
before: Route Insertion Point
---
          <Route path="/<%= h.changeCase.kebab(h.inflection.pluralize(name)) %>/id/:instanceId" component={<%= h.changeCase.ucFirst(h.changeCase.camel(name)) %>DetailPage}/>
          <Route path="/<%= h.changeCase.kebab(h.inflection.pluralize(name)) %>" component={<%= h.changeCase.ucFirst(h.changeCase.camel(h.inflection.pluralize(name))) %>List}/>