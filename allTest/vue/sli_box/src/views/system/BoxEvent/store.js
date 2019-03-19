import {
  getList,
  getItem
} from './model';
import factory from 'store/factory';

export const STORE_NAME = 'boxEvent';
export default factory.createInstance({
  fetchList: getList,
  fetchItem: getItem,
  state: {
    dataDetailModal: false
  },
  mutation: {
    setDataDetailModal (state, val) {
      state.dataDetailModal = val;
    }
  }
});
