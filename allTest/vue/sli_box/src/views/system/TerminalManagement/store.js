import { getList, getSelectedAdList } from './model';
import factory from 'store/factory';

const state = {
  selectedAdList: [], // 和字已投放的广告数据列表
  boxId: ''
};

const mutation = {
  setSelectedAdList (state, val) {
    state.selectedAdList = val;
  },
  setBoxId (state, val) {
    state.boxId = val;
  }
};

const action = {
  async getSelectedAdData ({
    commit,
    dispatch
  }, params) {
    dispatch('addItem');

    const { success, data, msg } = await getSelectedAdList(params);
    if (success) {
      commit('setSelectedAdList', data);
      commit('setModal', true);
    } else {
      return msg;
    }
  }
};

export default factory.createInstance({
  fetchList: getList,
  state,
  mutation,
  action
});

export const STORE_NAME = 'terminalManagement';
