import {
  getList,
  getItem
} from './model';
import factory from 'store/factory';
import tips from 'utils/tips';

export const STORE_NAME = 'DividedSettings';
export default factory.createInstance({
  fetchList: getList,
  fetchItem: getItem
})
  .addState({
    showDividedModal: false,
    showOperationRecordModal: false,
    merchantId: ''
  })
  .addMutation({
    setDividedModal (state, val) {
      state.showDividedModal = val;
    },
    setOperationRecordModal (state, val) {
      state.showOperationRecordModal = val;
    },
    setMerchantId (state, val) {
      state.merchantId = val;
    }
  })
  .addAction({
    async viewDividedEdit ({
      commit,
      dispatch
    }, params) {
      commit('setDividedModal', true);
      commit('setMerchantId', params);
      //   commit('setStatus', params.status);
    },
    // async dividedRuleEdit ({
    //   commit,
    //   dispatch
    // }, params) {
    //   commit('setDividedRuleModal', true);
    //   commit('setDividedRuleId', params);
    // },
    async viewOperationRecord ({
      commit,
      dispatch
    }, params) {
      commit('setOperationRecordModal', true);
      commit('setItemId', params.rule_id);
    },
    async myEditItem ({
      commit,
      dispatch
    }, params) {
      commit('setItemLoading', true);
      commit('setItemId', params.rule_id);
      const {
        success,
        data,
        msg
      } = await dispatch('apiItem', params);

      if (success) {
        commit('setModal', true);
        commit('setFormData', data);
        commit('setItemLoading', false);
      } else {
        tips.error({
          content: msg
        });
      }
    }
  });
