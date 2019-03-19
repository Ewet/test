import actions from './actions';
import mutations from './mutations';
import states from './states';

export default {
  createInstance: ({
    fetchList,
    fetchItem,
    state,
    mutation,
    action,
    modules
  }) => ({
    namespaced: true,
    state: Object.assign({}, states(), {
      ...state
    }),
    mutations: Object.assign({}, mutations(), {
      ...mutation
    }),
    actions: Object.assign({}, actions(), {
      apiList (undefinded, data) {
        return fetchList(data);
      },
      apiItem (undefinded, data) {
        if (fetchItem) {
          return fetchItem(data);
        }
      }
    }, {
      ...action
    }),
    modules,
    // 添加module
    addModule (_module) {
      Object.assign(this.modules, _module);
      return this;
    },
    // 添加state
    addState (_state) {
      Object.assign(this.state, _state);
      return this;
    },
    // 添加mutation
    addMutation (_mutation) {
      Object.assign(this.mutations, _mutation);
      return this;
    },
    // 添加action
    addAction (_action) {
      Object.assign(this.actions, _action);
      return this;
    }
  })
};
