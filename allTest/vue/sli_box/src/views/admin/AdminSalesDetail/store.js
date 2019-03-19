import { getList } from 'views/admin/AdminSalesDetail/model';
import factory from 'store/factory';

export const STORE_NAME = 'adminSalesDetail';
export default factory.createInstance(Object.assign({
  fetchList: getList
}));
