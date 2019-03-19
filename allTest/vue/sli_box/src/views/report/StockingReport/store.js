import { getList } from 'views/report/StockingReport/model';
import factory from 'store/factory';

export const STORE_NAME = 'stockupReport';
export default factory.createInstance({
  fetchList: getList,
  state: {
    pageSize: 10000
  }
});
