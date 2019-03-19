
import { getList, getItem } from './model';
import factory from 'store/factory';

const newObj = Object.assign({
  fetchList: getList,
  fetchItem: getItem,
  action: {
    async viewItemCallback ({ dispatch }) {
      dispatch('reload');
    }
  }
});
export const STORE_NAME = 'monitor';
export default factory.createInstance(newObj);
