import tips from 'utils/tips';
import { format } from 'utils/params';

export default () => ({
  async reload ({ state, dispatch }) {
    dispatch('pageChange', state.page);
  },
  async pageChange ({ commit, state, dispatch }, page) {
    commit('setSelectedItems', []);
    commit('openLoading');
    commit('setPage', page);
    let { pageSize } = state;
    if (pageSize === 'all') {
      pageSize = 999999999;
      commit('setPageSize', pageSize);
    }
    const params = format({
      ...state.filter,
      'pagination[page]': page,
      ...state.internalFilterObj,
      'pagination[page_size]': pageSize
    });
    const {
      success, data, msg
    } = await dispatch('apiList', params);
    if (success) {
      if (page > 1 && data.items.length === 0) {
        dispatch('pageChange', page - 1);
      } else {
        commit('setItems', data);
      }
    } else {
      tips.error({
        content: msg
      });
    }
    commit('closeLoading');
  },
  async filterData ({ commit, state, dispatch }, filter) {
    commit('openLoading');
    commit('setFilter', filter);
    let { pageSize } = state;
    if (pageSize === 'all') {
      pageSize = 999999999;
      commit('setPageSize', pageSize);
    }
    const {
      success, data, msg
    } = await dispatch('apiList', format({
      ...filter,
      'pagination[page]': state.page,
      ...state.internalFilterObj,
      'pagination[page_size]': pageSize

    }));
    if (success) {
      commit('setItems', data);
    } else {
      tips.error({
        content: msg
      });
    }
    commit('closeLoading');
  },
  clearFilter ({ commit, state, dispatch }) {
    dispatch('filterData', {});
  },
  async addItem ({ commit }) {
    commit('setModal', true);
    commit('setFormData', {});
    commit('setItemId', '');
  },
  async editItem ({ commit, dispatch }, params) {
    commit('setItemLoading', true);
    commit('setItemId', params);
    const {
      success, data, msg
    } = await dispatch('apiItem', params);
    if (success) {
      commit('setModal', true);
      commit('setFormData', data);
      commit('setItemLoading', false);
    } else {
      tips.error({
        content: msg
      });
    }
  },
  async apiList () {

  },
  async apiItem () {

  },
  async viewItem ({ commit, dispatch }, params) {
    commit('setItemLoading', true);
    commit('setItemId', params);
    const {
      success, data, msg
    } = await dispatch('apiItem', params);
    if (success) {
      dispatch('viewItemCallback');
      commit('setViewModal', true);
      commit('setFormData', data);
      commit('setItemLoading', false);
    } else {
      tips.error({
        content: msg
      });
    }
  },
  async viewItemCallback (state) {
  },
  async reloadItem ({ commit, dispatch, state }, params) {
    commit('setItemLoading', true);
    const {
      success, data, msg
    } = await dispatch('apiItem', state.itemId);
    if (success) {
      commit('setFormData', data);
      commit('setItemLoading', false);
    } else {
      tips.error({
        content: msg
      });
    }
  }
});
