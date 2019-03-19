import { getList } from 'views/report/WinningNote/model';
import factory from 'store/factory';

export const STORE_NAME = 'winningNote';
export default factory.createInstance({ fetchList: getList });
