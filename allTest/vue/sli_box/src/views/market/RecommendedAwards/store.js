import { getList, getItem } from './model';
import factory from 'store/factory';

const state = {
  activityData: {},
  activityName: '',
  showInfoModal: false,
  readonly: false
};

const mutation = {
  setReadonly (state, val) {
    state.readonly = val;
  },
  setActivityName (state, val) {
    state.activityName = val;
  },
  setActivityData (state, val) {
    state.activityData = val;
  },
  setInfoModal (state, val) {
    state.showInfoModal = val;
  }
};

const action = {
  async showInfo ({
    commit,
    dispatch
  }, params) {
    const { success, data, msg } = await getItem(params.id);
    if (success) {
      commit('setActivityName', params.activityName);
      commit('setActivityData', data);
      commit('setInfoModal', true);
    } else {
      return msg;
    }
  }
};

export default factory.createInstance({
  fetchList: getList,
  fetchItem: getItem,
  state,
  mutation,
  action
});

export const STORE_NAME = 'recommendedAwards';
