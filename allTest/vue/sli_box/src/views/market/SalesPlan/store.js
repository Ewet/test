import {
  getList,
  getItem
} from './model';
import factory from 'store/factory';

export default factory.createInstance({
  fetchList: getList,
  fetchItem: getItem,
  state: {
    layerId: '',
    planId: '',
    goodsName: '',
    goodsId: '',
    SaleGoodsId: '',
    showGoodsModal: false,
    goodsPrice: null
  },
  mutation: {
    setLayerId (state, val) {
      state.layerId = val;
    },
    setPlanId (state, val) {
      state.planId = val;
    },
    setGoodsModal (state, val) {
      state.showGoodsModal = val;
    },
    setGoodsName (state, val) {
      state.goodsName = val;
    },
    setGoodsId (state, val) {
      state.goodsId = val;
    },
    setSaleGoodsId (state, val) {
      state.SaleGoodsId = val;
    },
    setGoodsPrice (state, val) {
      state.goodsPrice = val;
    }
  },
  action: {
    async addPlan ({
      commit,
      dispatch
    }, params) {
      commit('setLayerId', params.layerId);
      commit('setPlanId', params.planId);
      commit('setGoodsId', params.goodsId);
      commit('setSaleGoodsId', params.goodsId);
      dispatch('addItem');
    }
  }
});

export const STORE_NAME = 'salePlan';
