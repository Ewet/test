import { getList, getItem } from './model';
import tips from 'utils/tips';
import factory from 'store/factory';

export default factory.createInstance({
  fetchList: getList,
  fetchItem: getItem,
  state: {
    advertisingId: '',
    pageSize: 20
  },
  mutation: {
    setAdId (state, val) {
      state.advertisingId = val;
    }
  },
  action: {
    async editDeliveryPlan ({ commit, dispatch }, params) {
      commit('setItemLoading', true);
      commit('setItemId', params);
      const {
        success, data, msg
      } = await dispatch('apiItem', params);
      if (success) {
        // commit('setModal', true);
        commit('setFormData', data);
        commit('setItemLoading', false);
      } else {
        tips.error({
          content: msg
        });
      }
    }
  }
});

export const STORE_NAME = 'deliverySettings';
