import {
  getList
} from './model';
import factory from 'store/factory';

export default factory.createInstance({
  fetchList: getList,
  state: {
    showSupplyOrderModal: false,
    showBoxModal: false
  },
  mutation: {
    setSupplyOrderModal (state, val) {
      state.showSupplyOrderModal = val;
    },
    setBoxModal (state, val) {
      state.showBoxModal = val;
    }
  }
});

export const STORE_NAME = 'order';
