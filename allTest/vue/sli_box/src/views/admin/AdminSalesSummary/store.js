import { getList } from 'views/admin/AdminSalesSummary/model';
import factory from 'store/factory';

export const STORE_NAME = 'adminSalesSummary';
export default factory.createInstance({
  fetchList: getList,
  state: {
    pageSize: 20
  }
});
