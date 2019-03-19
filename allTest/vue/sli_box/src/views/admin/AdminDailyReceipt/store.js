import { getList } from 'views/admin/AdminDailyReceipt/model';
import factory from 'store/factory';
// import orderDetail from './orderDetail';
export const STORE_NAME = 'adminDailyReceipt';
export default factory.createInstance({
  fetchList: getList
});
