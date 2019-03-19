import { getList } from 'views/finance/AlreadyPay/model';
import factory from 'store/factory';

export default factory.createInstance({ fetchList: getList });

export const STORE_NAME = 'withdrawPendingReview';
