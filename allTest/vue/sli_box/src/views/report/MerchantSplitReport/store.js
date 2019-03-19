import {
  getList
} from 'views/report/MerchantSplitReport/model';
import factory from 'store/factory';

export const STORE_NAME = 'merchantSplitReport';
export default factory.createInstance({
  fetchList: getList,
  state: {
    pageSize: 15
  }
});
