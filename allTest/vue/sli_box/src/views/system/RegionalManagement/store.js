import { getList, getItem, delItem } from './model';
import factory from 'store/factory';

export const STORE_NAME = 'area';
export default factory.createInstance({ fetchList: getList, fetchItem: getItem, delItem });
