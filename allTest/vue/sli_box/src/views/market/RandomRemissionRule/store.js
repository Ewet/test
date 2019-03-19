
import { getList, getItem, delItem } from './model';
import factory from 'store/factory';

export default factory.createInstance({ fetchList: getList, fetchItem: getItem, delItem });

export const STORE_NAME = 'randomRemissionRule';
