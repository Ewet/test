import factory from 'store/factory';
import {
  getList,
  getItem,
  getCommunicateInfo
} from './model';

const state = {
  pageSize: 20,
  ticketId: '',
  communicateInfoData: {}, // 工单-沟通数据
  communicateInfoModal: false // 工单-沟通详情
};

const mutation = {
  setTicketId (state, val) {
    state.ticketId = val;
  },
  setCommunicateInfoModal (state, val) {
    state.communicateInfoModal = val;
  },
  setCommunicateInfoData (state, val) {
    state.communicateInfoData = val;
  }
};

const action = {
  async getCommunicateInfoData ({
    commit,
    dispatch
  }, params) {
    const { success, data, msg } = await getCommunicateInfo(params);
    if (success) {
      commit('setCommunicateInfoData', data);
      commit('setTicketId', params);
      commit('setCommunicateInfoModal', true);
    } else {
      return msg;
    }
  }
};

export const STORE_NAME = 'myWorkOrder';
export default factory.createInstance({
  fetchList: getList,
  fetchItem: getItem,
  state,
  mutation,
  action
});
