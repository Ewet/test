
import { getList, getItem } from './model';
import factory from 'store/factory';

const state = {
  showBoxModal: false,
  boxRow: {}
};

const mutation = {
  setShowBoxModal (state, val) {
    state.showBoxModal = val;
  },
  addBox (state, val) {
    state.boxRow = val;
  }
};

const action = {

};

export const STORE_NAME = 'purchasingManagement';
export default factory.createInstance({
  fetchList: getList,
  fetchItem: getItem,
  state,
  mutation,
  action
});
