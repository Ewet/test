import {
  getList
} from 'views/report/WeChatwinningRecord/model';
import factory from 'store/factory';

export const STORE_NAME = 'weChatwinningRecord';
export default factory.createInstance(Object.assign({ fetchList: getList }));
