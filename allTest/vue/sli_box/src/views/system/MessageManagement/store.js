
import { getList } from './model';
import factory from 'store/factory';

export const STORE_NAME = 'message';
export default factory.createInstance({ fetchList: getList });
