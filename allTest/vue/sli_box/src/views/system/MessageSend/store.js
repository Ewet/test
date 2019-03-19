import {
  getList
} from './model';
import factory from 'store/factory';

export const STORE_NAME = 'messageSend';
export default factory.createInstance({
  fetchList: getList,
  state: {
    pageSize: 20
  }
});
