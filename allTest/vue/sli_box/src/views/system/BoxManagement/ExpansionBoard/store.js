import { getExpansionBoardList } from './model';

const exponsionBoardState = {
  showExpansionBoardModal: false,
  expansionBoardData: [],
  showViewChannelModal: false,
  expansionBoardId: '',
  collectionBoardId: '',
  showAddExpansionBoardModal: false
};
const exponsionBoardMutation = {
  setCollectionBoardId (state, val) {
    state.collectionBoardId = val;
  },
  setExpansionBoardModal (state, val) {
    state.showExpansionBoardModal = val;
  },
  setExpansionBoardData (state, val) {
    state.expansionBoardData = val;
  },
  setViewChannelModal (state, val) {
    state.showViewChannelModal = val;
  },
  setExpansionBoardId (state, val) {
    state.expansionBoardId = val;
  },
  setAddExpansionBoardModal (state, val) {
    state.showAddExpansionBoardModal = val;
  }
};
const exponsionBoardAction = {
  getExpansionBoardData ({
    commit,
    dispatch
  }, params) {
    getExpansionBoardList(params).then((res) => {
      commit('setExpansionBoardData', res.data.items);
    });
  },
  viewChannelAction ({
    commit
  }, params) {
    commit('setExpansionBoardId', params);
    commit('setViewChannelModal', true);
  }
};

export {
  exponsionBoardState,
  exponsionBoardMutation,
  exponsionBoardAction
};
