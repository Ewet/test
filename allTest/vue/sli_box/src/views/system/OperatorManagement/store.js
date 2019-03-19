import { getList, getItem } from './model';
import factory from 'store/factory';

const state = {
  signInData: {},
  showSettingModal: false
};

const mutation = {
  setSignInData (state, val) {
    state.signInData = val;
  },
  setSettingModalVal (state, val) {
    state.showSettingModal = val;
  }
};

const action = {
  setSettingModal ({
    commit,
    dispatch
  }, params) {
    commit('setSettingModalVal', params);
    if (params === false) {
      commit('setSignInData', {});
    }
  },
  async landingSetting ({
    commit,
    dispatch
  }, params) {
    const dataJson = {
      businessmanId: params.operatorId,
      account: params.account,
      password: ''
    };
    commit('setSignInData', dataJson);
    dispatch('setSettingModal', true);
  }
};

export const STORE_NAME = 'operatorManagement';
export default factory.createInstance({
  fetchList: getList,
  fetchItem: getItem,
  state,
  mutation,
  action
});
