import {
  getList
} from './model';
import factory from 'store/factory';

const stateReportDetail = {
  showReportForm: false,
  showMerchantModal: false,
  merchantName: ''
};

const mutationReportDetail = {
  setReportFormModal (state, val) {
    state.showReportForm = val;
  },
  setMerchantModal (state, val) {
    if (val) {
      state.merchantName = '';
    }
    state.showMerchantModal = val;
  },
  setMerchantName (state, val) {
    state.merchantName = val;
  }
};

const actionReportDetail = {
  async showReportFormModal ({
    commit,
    dispatch
  }, params) {
    commit('setReportFormModal', true);
  }
};

const state = Object.assign({}, stateReportDetail);
const mutation = Object.assign({}, mutationReportDetail);
const action = Object.assign({}, actionReportDetail);
export const STORE_NAME = 'adminOrderReport';
export default factory.createInstance({
  fetchList: getList,
  state,
  mutation,
  action
});

// export default factory.createInstance(Object.assign({
//   'fetchList': getList
// }, orderDetail));
