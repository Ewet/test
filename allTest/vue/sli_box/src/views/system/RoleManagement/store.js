import { getList, getItem } from './model';
import factory from 'store/factory';

export const STORE_NAME = 'roleManagement';
export default factory.createInstance({ fetchList: getList, fetchItem: getItem });
