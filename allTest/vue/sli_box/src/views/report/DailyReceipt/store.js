import { getList } from 'views/report/DailyReceipt/model';
import factory from 'store/factory';
// import orderDetail from './orderDetail';
export const STORE_NAME = 'dailyReceipt';
export default factory.createInstance({
  fetchList: getList
});
