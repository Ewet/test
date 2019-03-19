import { getList, getItem } from 'views/personnel/Replenisher/model';
import factory from 'store/factory';

export default factory.createInstance({ fetchList: getList, fetchItem: getItem });

export const STORE_NAME = 'replenisher';
