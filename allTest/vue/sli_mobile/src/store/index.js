import Vue from 'vue';
import Vuex from 'vuex';
import confirmOrder from './modules/confirmOrder';
Vue.use(Vuex);

const debug = process.env.NODE_ENV !== 'production';

export default new Vuex.Store({
  state: {
    token: ''
  },
  strict: debug,
  modules: {
    confirmOrder
  }
});
