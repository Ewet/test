import Vue from 'vue';
import Vuex from 'vuex';
import actions from './actions';
import mutations from './mutations';
import getters from './getters';
import modules from './modules';

Vue.use(Vuex);

const debug = process.env.NODE_ENV !== 'production';

export default new Vuex.Store({
  state: {
    token: '',
    imgTitle: '',
    imgUrl: '',
    imgModal: false,
    showLoadingModal: false
  },
  strict: debug,
  actions,
  mutations,
  getters,
  modules
});
