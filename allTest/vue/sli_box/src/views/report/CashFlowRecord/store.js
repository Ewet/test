import { getList } from 'views/report/CashFlowRecord/model';
import factory from 'store/factory';

export const STORE_NAME = 'cashFlowRecord';
export default factory.createInstance({ fetchList: getList });
