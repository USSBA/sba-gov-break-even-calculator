---
to: ui/src/models/<%= h.changeCase.kebab(h.inflection.pluralize(name)) %>/<%= h.changeCase.ucFirst(h.changeCase.camel(name)) %>.js
---
import { types, applySnapshot } from 'mobx-state-tree';

import UserIdentifier from '../users/UserIdentifier';

// ==================================================================
// <%= h.changeCase.ucFirst(h.changeCase.camel(name)) %>
// ==================================================================
const <%= h.changeCase.ucFirst(h.changeCase.camel(name)) %> = types.model('<%= h.changeCase.ucFirst(h.changeCase.camel(name)) %>', {
  id: types.identifier,
  rev: types.maybe(types.number),
  name: '',
  createdAt: '',
  createdBy: types.optional(UserIdentifier,{}),
  updatedAt: '',
  updatedBy: types.optional(UserIdentifier,{}),
})
  .actions(self => ({

    set<%= h.changeCase.ucFirst(h.changeCase.camel(name)) %>(raw<%= h.changeCase.ucFirst(h.changeCase.camel(name)) %>) {
      // Note: if you have partial data vs full data, you need to replace the applySnapshot() with
      // the appropriate logic
      applySnapshot(self, raw<%= h.changeCase.ucFirst(h.changeCase.camel(name)) %>);
    },

  }))

  .views(self => ({
    // add view methods here
  }));

export { <%= h.changeCase.ucFirst(h.changeCase.camel(name)) %> };