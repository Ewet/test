import {
  getList
} from './model';
import factory from 'store/factory';

export const STORE_NAME = 'merchantShareDetails';

let state = {
  ruleId: '',
  merchantId: ''
};

let mutation = {
  setRuleId (state, val) {
    state.ruleId = val;
  },
  setMerchantId (state, val) {
    state.merchantId = val;
  }
};

let action = {
  getListData ({ commit, dispatch }, params) {
    commit('setRuleId', params.ruleId);
    commit('setMerchantId', params.merchantId);
    dispatch('filterData', {
      rule_id: params.ruleId,
      merchant_id: params.merchantId
    });
  }
};

export default factory.createInstance({
  fetchList: getList,
  state,
  mutation,
  action
});
