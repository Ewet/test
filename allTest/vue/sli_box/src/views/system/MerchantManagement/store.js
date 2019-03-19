import { getList, getItem } from './model';
import factory from 'store/factory';

export const STORE_NAME = 'merchantManagement';
export default factory.createInstance({
  fetchList: getList,
  fetchItem: getItem,
  state: {
    showDividedModal: false
    // showDividedRuleModal: false,
    // showOperationRecordModal: false,
    // merchantId: '',
    // dividedRuleId: ''
    // status: '',
    // isEdit: '0',
    // inHand: '',
    // showWeChatDrawDetailModal: false,
    // detailData: ''
  },
  mutation: {
    setDividedModal (state, val) {
      state.showDividedModal = val;
    }
    // setDividedRuleModal (state, val) {
    //   state.showDividedRuleModal = val;
    // },
    // setOperationRecordModal (state, val) {
    //   state.showOperationRecordModal = val;
    // },
    // setMerchantId (state, val) {
    //   state.merchantId = val;
    // },
    // setDividedRuleId (state, val) {
    //   state.dividedRuleId = val;
    // }
    // setStatus (state, val) {
    //   state.status = val;
    // },
    // setIsEdit (state, val) {
    //   state.isEdit = val;
    // },
    // setWeChatDrawDetailModal (state, val) {
    //   state.showWeChatDrawDetailModal = val;
    // },
    // setDetailData (state, val) {
    //   state.detailData = val;
    // },
    // setInHand (state, val) {
    //   state.inHand = val;
    // }
  },
  action: {
    async viewDividedEdit ({
      commit,
      dispatch
    }, params) {
      commit('setDividedModal', true);
      commit('setItemId', params);
      //   commit('setStatus', params.status);
    }
    // async dividedRuleEdit ({
    //   commit,
    //   dispatch
    // }, params) {
    //   commit('setDividedRuleModal', true);
    //   commit('setDividedRuleId', params);
    // },
    // async viewOperationRecord ({
    //   commit,
    //   dispatch
    // }, params) {
    //   commit('setOperationRecordModal', true);
    //   commit('setDividedRuleId', params);
    // }
  }
});
