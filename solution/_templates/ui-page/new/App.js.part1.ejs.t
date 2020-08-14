---
inject: true
to: ui/src/App.js
before: Import Insertion Point
---
import <%= h.changeCase.ucFirst(h.changeCase.camel(h.inflection.pluralize(name))) %>List from './parts/<%= h.changeCase.kebab(h.inflection.pluralize(name)) %>/<%= h.changeCase.ucFirst(h.changeCase.camel(h.inflection.pluralize(name))) %>List';
import <%= h.changeCase.ucFirst(h.changeCase.camel(name)) %>DetailPage from './parts/<%= h.changeCase.kebab(h.inflection.pluralize(name)) %>/<%= h.changeCase.ucFirst(h.changeCase.camel(name)) %>DetailPage';