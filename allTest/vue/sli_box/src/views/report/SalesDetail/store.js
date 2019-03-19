import { getList } from 'views/report/SalesDetail/model';
import factory from 'store/factory';

export const STORE_NAME = 'salesDetail';
export default factory.createInstance(Object.assign({
  fetchList: getList
}));
