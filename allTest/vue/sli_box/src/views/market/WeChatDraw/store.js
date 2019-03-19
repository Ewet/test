import {
  getList,
  getItem
} from './model';
import factory from 'store/factory';

export default factory.createInstance({
  fetchList: getList,
  fetchItem: getItem,
  state: {
    showAwardModal: false,
    showPrizeEditModal: false,
    activityId: '',
    prizeId: '',
    status: '',
    isEdit: '0',
    inHand: '',
    showWeChatDrawDetailModal: false,
    detailData: ''
  },
  mutation: {
    setAwardModal (state, val) {
      state.showAwardModal = val;
    },
    setPrizeEditModal (state, val) {
      state.showPrizeEditModal = val;
    },
    setActivityId (state, val) {
      state.activityId = val;
    },
    setPrizeId (state, val) {
      state.prizeId = val;
    },
    setStatus (state, val) {
      state.status = val;
    },
    setIsEdit (state, val) {
      state.isEdit = val;
    },
    setWeChatDrawDetailModal (state, val) {
      state.showWeChatDrawDetailModal = val;
    },
    setDetailData (state, val) {
      state.detailData = val;
    },
    setInHand (state, val) {
      state.inHand = val;
    }
  },
  action: {
    async awardEdit ({
      commit,
      dispatch
    }, params) {
      commit('setAwardModal', true);
      commit('setActivityId', params.id);
      commit('setStatus', params.status);
    },
    async prizeEdit ({
      commit,
      dispatch
    }, params) {
      commit('setPrizeEditModal', true);
      commit('setPrizeId', params);
    }
  }
});

export const STORE_NAME = 'weChatDraw';
