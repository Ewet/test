import { getList } from 'views/report/ReplenishmentReport/model';
import factory from 'store/factory';

export const STORE_NAME = 'replenishmentReport';
export default factory.createInstance({
  fetchList: getList,
  state: {
    pageSize: 'all'
  }
});
