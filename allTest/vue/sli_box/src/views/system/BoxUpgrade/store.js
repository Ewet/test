import {
  getList,
  getItem,
  getFirmwaresTypeList
} from './model';
import factory from 'store/factory';

const state = {
  upgrade: '', // 升级类型
  boxIdArr: [], // 要升级的盒子ID
  boxNo: '', // 盒子编号
  styleOption: [], // 固件类型
  showModalUpgrade: false
};

const mutation = {
  setBoxNo (state, val) {
    state.boxNo = val;
  },
  setStyleOption (state, val) {
    state.styleOption = val;
  },
  setUpgrade (state, val) {
    state.upgrade = val;
  },
  setBoxIdArr (state, val) {
    state.boxIdArr = val;
  },
  setModalUpgrade (state, val) {
    state.showModalUpgrade = val;
  }
};

const action = {
  // 显示升级弹框
  async viewUpgrade ({
    commit,
    dispatch
  }, params) {
    dispatch('getFirmwaresType');
    commit('setUpgrade', params);
    commit('setModalUpgrade', true);
  },

  //  固件类型列表
  async getFirmwaresType ({
    commit,
    dispatch
  }, params) {
    const { success, data } = await getFirmwaresTypeList();
    if (success) {
      const arr = [
        { label: '客户端主程序', value: data.client_main },
        { label: '监控助手', value: data.client_monitor },
        { label: '广告程序', value: data.client_adv },
        { label: '程序守卫', value: data.clent_daemon },
        { label: '硬件程序', value: data.hardware }
      ];
      commit('setStyleOption', arr);
    }
  }

};

export const STORE_NAME = 'boxUpgrade';
export default factory.createInstance({
  fetchList: getList,
  fetchItem: getItem,
  state,
  mutation,
  action
});
