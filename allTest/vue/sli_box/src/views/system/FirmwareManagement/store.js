import {
  getList,
  delItem
} from './model';
import factory from 'store/factory';

export const STORE_NAME = 'firmwareManagement';
export default factory.createInstance({
  fetchList: getList,
  delItem,
  state: {
    isAddEdit: true,
    firmwareId: '',
    detailData: {}
  },
  mutation: {
    setFirmwareId (state, val) {
      state.firmwareId = val;
    },
    setIsAddFirmwareModal (state, val) {
      state.isAddEdit = val;
    },
    setDetailData (state, val) {
      state.detailData = val;
    }
  },
  action: {
    editFirmwareAction ({ commit, dispatch }, params) {
      commit('setFirmwareId', params.id);
      commit('setIsAddFirmwareModal', false);
      commit('setDetailData', params.detailData);
      dispatch('addItem');
    }
  }
});
