import { getList, getItem } from './model';
import factory from 'store/factory';

export default factory.createInstance({
  fetchList: getList,
  fetchItem: getItem,
  state: {
    pageSize: 20
  }
});

export const STORE_NAME = 'applicationPurchase';
