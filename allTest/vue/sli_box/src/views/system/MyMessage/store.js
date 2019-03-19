import {
  getList
} from 'views/system/NotificationCenter/model';
import factory from 'store/factory';

export const STORE_NAME = 'myMessage';

export default factory.createInstance({
  fetchList: getList,
  state: {
    pageSize: 20
  }
});
