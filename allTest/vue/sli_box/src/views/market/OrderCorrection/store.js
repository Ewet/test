import { getList, getItem } from './model';
import factory from 'store/factory';

const state = {
  orderSn: '',
  pageSize: 20,
  showAddRefundsModal: false,
  showGoodsModal: false,
  selectIndex: null
};

const mutation = {
  setOrderSn (state, val) {
    state.orderSn = val;
  },
  setAddRefundsModal (state, val) {
    state.showAddRefundsModal = val;
  },
  setGoodsModal (state, val) {
    state.showGoodsModal = val;
  },
  setSelectIndex (state, val) {
    state.selectIndex = val;
  }
};

const action = {
};

export default factory.createInstance({
  fetchList: getList,
  fetchItem: getItem,
  state,
  mutation,
  action
});

export const STORE_NAME = 'orderCorrection';
