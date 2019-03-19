import { getList, getItem } from './model';
import factory from 'store/factory';

const state = {
  pageSize: 20,
  visible: false, // 图片预览
  visibleUrl: '' // 图片预览地址
};

const mutation = {
  setVisible (state, val) {
    state.visible = val;
  },
  setVisibleUrl (state, val) {
    state.visibleUrl = val;
  }
};

const action = {
  async showImg ({
    commit,
    dispatch
  }, params) {
    commit('setVisibleUrl', params.url);
    commit('setVisible', params.visible);
  }
};

export const STORE_NAME = 'newsManagement';
export default factory.createInstance({
  fetchList: getList,
  fetchItem: getItem,
  state,
  mutation,
  action
});
