import state from './states';
import mutation from './mutations';
import action from './actions';
import { getList, getItem, delItem } from '../model';
import factory from 'store/factory';
import masterControl from 'views/system/MasterControl/store';
import collectionEdition from 'views/system/CollectionEdition/store';

const modules = {
  masterControl,
  collectionEdition
};

export const STORE_NAME = 'boxManagement';
export default factory.createInstance({
  fetchList: getList,
  fetchItem: getItem,
  delItem,
  state,
  action,
  mutation,
  modules
});
