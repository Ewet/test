import { getList, getItem } from './model';
import factory from 'store/factory';

export default factory.createInstance({
  fetchList: getList,
  fetchItem: getItem,
  state: {
    showModalDeliveryIndex: false,
    showModalDeliveryEdit: false,
    showBoxModal: false,
    pageSize: 20
  },
  mutation: {
    setModalDeliveryIndex (state, val) {
      state.showModalDeliveryIndex = val;
    },
    setModalDeliveryEdit (state, val) {
      state.showModalDeliveryEdit = val;
    },
    setModalBox (state, val) {
      state.showBoxModal = val;
    }
  },
  action: {
    async deliverySetting ({
      commit,
      dispatch
    }, params) {
      commit('setModalDeliveryIndex', true);
      commit('setItemId', params);
    },
    async offDeliveryIndex ({
      commit,
      dispatch
    }, params) {
      commit('setModalDeliveryIndex', false);
      commit('setItemId', '');
    }
  }
});

export const STORE_NAME = 'advertisingManagement';
