import { getList, getItem } from './model';
import factory from 'store/factory';
import tips from 'utils/tips';

const instance = factory.createInstance({ fetchList: getList, fetchItem: getItem });
instance.actions.editItem = async ({ commit, dispatch }, params) => {
  const {
    success, msg
  } = await dispatch('apiItem', params);
  if (success) {
    commit('setItemLoading', true);
    commit('setModal', true);
    commit('setItemId', params);
  } else {
    tips.error({
      content: msg
    });
  }
};
export default instance;

export const STORE_NAME = 'coupon';
