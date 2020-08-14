---
to: ui/src/models/<%= h.changeCase.kebab(h.inflection.pluralize(name)) %>/<%= h.changeCase.ucFirst(h.changeCase.camel(h.inflection.pluralize(name))) %>Store.js
---
import _ from 'lodash';
import { types } from 'mobx-state-tree';

import { get<%= h.changeCase.ucFirst(h.changeCase.camel(h.inflection.pluralize(name))) %> } from '../../helpers/api';
import { consolidateToMap } from '../../helpers/utils';
import { BaseStore } from '../BaseStore';
import { <%= h.changeCase.ucFirst(h.changeCase.camel(name)) %> } from './<%= h.changeCase.ucFirst(h.changeCase.camel(name)) %>';
import { <%= h.changeCase.ucFirst(h.changeCase.camel(name)) %>Store } from './<%= h.changeCase.ucFirst(h.changeCase.camel(name)) %>Store';

// ==================================================================
// <%= h.changeCase.ucFirst(h.changeCase.camel(h.inflection.pluralize(name))) %>Store
// ==================================================================
const <%= h.changeCase.ucFirst(h.changeCase.camel(h.inflection.pluralize(name))) %>Store = BaseStore
  .named('<%= h.changeCase.ucFirst(h.changeCase.camel(h.inflection.pluralize(name))) %>Store')
  .props({
    <%= h.changeCase.camel(h.inflection.pluralize(name)) %>: types.optional(types.map(<%= h.changeCase.ucFirst(h.changeCase.camel(name)) %>), {}),
    <%= h.changeCase.camel(name) %>Stores: types.optional(types.map(<%= h.changeCase.ucFirst(h.changeCase.camel(name)) %>Store), {}),
    tickPeriod: 900 * 1000, // 15 minutes
  })

  .actions(self => {
    // save the base implementation of cleanup
    const superCleanup = self.cleanup;

    return {

      doLoad: async function() {
        const <%= h.changeCase.camel(h.inflection.pluralize(name)) %> = await get<%= h.changeCase.ucFirst(h.changeCase.camel(h.inflection.pluralize(name))) %>();
        // We try to preserve existing <%= h.changeCase.camel(h.inflection.pluralize(name)) %> data and merge the new data instead
        // We could have used self.<%= h.changeCase.camel(h.inflection.pluralize(name)) %>.replace(), but it will do clear() then merge()
        self.runInAction(() => {
          consolidateToMap(self.<%= h.changeCase.camel(h.inflection.pluralize(name)) %>, <%= h.changeCase.camel(h.inflection.pluralize(name)) %>, (exiting, newItem) => {
            exiting.set<%= h.changeCase.ucFirst(h.changeCase.camel(name)) %>(newItem);
          });    
        });
      },

      add<%= h.changeCase.ucFirst(h.changeCase.camel(name)) %>(raw<%= h.changeCase.ucFirst(h.changeCase.camel(name)) %>) {
        const id = raw<%= h.changeCase.ucFirst(h.changeCase.camel(name)) %>.id;
        const previous = self.<%= h.changeCase.camel(h.inflection.pluralize(name)) %>.get(id);

        if (!previous) {
          self.<%= h.changeCase.camel(h.inflection.pluralize(name)) %>.put(raw<%= h.changeCase.ucFirst(h.changeCase.camel(name)) %>);
        } else {
          previous.set<%= h.changeCase.ucFirst(h.changeCase.camel(name)) %>(raw<%= h.changeCase.ucFirst(h.changeCase.camel(name)) %>);
        }
      },

      get<%= h.changeCase.ucFirst(h.changeCase.camel(name)) %>Store: (<%= h.changeCase.camel(name) %>Id) => {
        let entry = self.<%= h.changeCase.camel(name) %>Stores.get(<%= h.changeCase.camel(name) %>Id);
        if (!entry) {
          // Lazily create the store
          self.<%= h.changeCase.camel(name) %>Stores.set(<%= h.changeCase.camel(name) %>Id, <%= h.changeCase.ucFirst(h.changeCase.camel(name)) %>Store.create({ <%= h.changeCase.camel(name) %>Id }));
          entry = self.<%= h.changeCase.camel(name) %>Stores.get(<%= h.changeCase.camel(name) %>Id);
        }

        return entry;
      },

      cleanup: () => {
        self.<%= h.changeCase.camel(h.inflection.pluralize(name)) %>.clear();
        superCleanup();
      }
    };
  })

  .views(self => ({

    get empty() {
      return self.<%= h.changeCase.camel(h.inflection.pluralize(name)) %>.size === 0;
    },

    get total() {
      return self.<%= h.changeCase.camel(h.inflection.pluralize(name)) %>.size;
    },

    get list() {
      const result = [];
      self.<%= h.changeCase.camel(h.inflection.pluralize(name)) %>.forEach((<%= h.changeCase.camel(name) %>) => result.push(<%= h.changeCase.camel(name) %>));

      return _.reverse(_.sortBy(result, ['createdAt', 'name']));
    },

    has<%= h.changeCase.ucFirst(h.changeCase.camel(name)) %>(id) {
      return self.<%= h.changeCase.camel(h.inflection.pluralize(name)) %>.has(id);
    },

    get<%= h.changeCase.ucFirst(h.changeCase.camel(name)) %>(id) {
      return self.<%= h.changeCase.camel(h.inflection.pluralize(name)) %>.get(id);
    },

  }));

function registerModels(globals) {
  globals.<%= h.changeCase.camel(h.inflection.pluralize(name)) %>Store = <%= h.changeCase.ucFirst(h.changeCase.camel(h.inflection.pluralize(name))) %>Store.create({}, globals);
}

export { <%= h.changeCase.ucFirst(h.changeCase.camel(h.inflection.pluralize(name))) %>Store, registerModels };
