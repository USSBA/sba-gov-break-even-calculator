---
to: ui/src/models/<%= h.changeCase.kebab(h.inflection.pluralize(name)) %>/<%= h.changeCase.ucFirst(h.changeCase.camel(name)) %>Store.js
---
import { getParent } from 'mobx-state-tree';

import { get<%= h.changeCase.ucFirst(h.changeCase.camel(name)) %> } from '../../helpers/api';
import { BaseStore } from '../BaseStore';

// ==================================================================
// <%= h.changeCase.ucFirst(h.changeCase.camel(name)) %>Store
// ==================================================================
const <%= h.changeCase.ucFirst(h.changeCase.camel(name)) %>Store = BaseStore
  .named('<%= h.changeCase.ucFirst(h.changeCase.camel(name)) %>Store')
  .props({
    <%= h.changeCase.camel(name) %>Id: '',
    tickPeriod: 300 * 1000, // 5 minutes
  })

  .actions(self => {
    // save the base implementation of cleanup
    const superCleanup = self.cleanup;

    return {

      doLoad: async function() {
        const parent = getParent(self, 2);
        const raw<%= h.changeCase.ucFirst(h.changeCase.camel(name)) %> = await get<%= h.changeCase.ucFirst(h.changeCase.camel(name)) %>(self.<%= h.changeCase.camel(name) %>Id);
        parent.add<%= h.changeCase.ucFirst(h.changeCase.camel(name)) %>(raw<%= h.changeCase.ucFirst(h.changeCase.camel(name)) %>);
      },

      cleanup: () => {
        superCleanup();
      }
    };
  })

  .views(self => ({
  
    get <%= h.changeCase.camel(name) %>() {
      const parent = getParent(self, 2);
      const w = parent.get<%= h.changeCase.ucFirst(h.changeCase.camel(name)) %>(self.<%= h.changeCase.camel(name) %>Id);
      return w;
    },

  }));

// Note: Do NOT register this in the global context, if you want to gain access to an instance
//       use <%= h.changeCase.camel(h.inflection.pluralize(name)) %>Store.get<%= h.changeCase.ucFirst(h.changeCase.camel(name)) %>Store()
export { <%= h.changeCase.ucFirst(h.changeCase.camel(name)) %>Store };
