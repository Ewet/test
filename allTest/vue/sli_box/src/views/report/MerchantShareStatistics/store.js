import {
  getList
} from './model';
import factory from 'store/factory';
import merchantShareDetails from 'views/report/MerchantShareDetails/store';

export const STORE_NAME = 'merchantShareStatistics';

let state = {
  showMerchantShareDetails: false
};

let mutation = {
  setMerchantShareDetails (state, val) {
    state.showMerchantShareDetails = val;
  }
};

let action = {
  getMerchantShareDetails ({ commit, dispatch }, params) {
    commit('setMerchantShareDetails', true);
    dispatch('merchantShareDetails/getListData', {
      ruleId: params.ruleId,
      merchantId: params.merchantId
    });
  }
};

const modules = {
  merchantShareDetails
};

export default factory.createInstance({
  fetchList: getList,
  state,
  mutation,
  action,
  modules
});
