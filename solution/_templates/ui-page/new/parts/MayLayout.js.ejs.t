---
inject: true
to: ui/src/parts/MainLayout.js
before: Menu Item Insertion Point
---
      { title: '<%= h.changeCase.ucFirst(h.changeCase.camel(h.inflection.pluralize(name))) %>', url: '/<%= h.changeCase.kebab(h.inflection.pluralize(name)) %>', icon: 'hand point right outline', show: true },