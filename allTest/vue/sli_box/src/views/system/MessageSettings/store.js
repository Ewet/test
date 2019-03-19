import { getList, getItem } from './model';
import factory from 'store/factory';

const state = {
  pageSize: 20
};
export const STORE_NAME = 'messageSettings';
export default factory.createInstance({
  fetchList: getList,
  fetchItem: getItem,
  state
});
