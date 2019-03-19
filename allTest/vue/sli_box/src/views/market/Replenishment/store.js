import { getList, getItem } from './model';
import factory from 'store/factory';

export default factory.createInstance({
  fetchList: getList,
  fetchItem: getItem,
  state: {
    remarkModal: false,
    bigImgModal: false,
    remarkData: [],
    bigImg: ''
  },
  mutation: {
    setRemarkModal (state, val) {
      state.remarkModal = val;
    },
    setremarkData (state, val) {
      state.remarkData = val;
    },
    setBigImg (state, val) {
      state.bigImg = val;
    },
    setBigImgModal (state, val) {
      state.bigImgModal = val;
    }
  }
});

export const STORE_NAME = 'replenishment';
