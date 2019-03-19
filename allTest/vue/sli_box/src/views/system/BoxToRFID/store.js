
import {
  getList
} from './model';
import factory from 'store/factory';

export const STORE_NAME = 'BoxToRFID';
export default factory.createInstance({
  fetchList: getList,
  state: {
    showQuantityModal: false,
    boxId: '',
    goodsId: ''
  },
  mutation: {
    setQuantityModal (state, val) {
      state.showQuantityModal = val;
    },
    setBoxId (state, val) {
      state.boxId = val;
    },
    setGoodsId (state, val) {
      state.goodsId = val;
    }
  },
  action: {
    async viewGoodsDetail ({
      commit,
      dispatch
    }, params) {
      commit('setModal', true);
      commit('setBoxId', params);
      // commit('setGoodsId', params.goodsId);
      // commit('setSaleGoodsId', params.goodsId);
      // dispatch('addItem');
    },
    async viewQuantityDetail ({
      commit,
      dispatch
    }, params) {
      commit('setQuantityModal', true);
      commit('setGoodsId', params);
      // commit('setGoodsId', params.goodsId);
      // commit('setSaleGoodsId', params.goodsId);
      // dispatch('addItem');
    }
  }
});
