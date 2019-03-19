import { getList } from './model';
import factory from 'store/factory';

export default factory.createInstance({ fetchList: getList });

export const STORE_NAME = 'invoiceDetails';
