import { getList } from 'views/report/SalesSummary/model';
import factory from 'store/factory';

export const STORE_NAME = 'salesSummary';
export default factory.createInstance({
  fetchList: getList,
  state: {
    pageSize: 20
  }
});
