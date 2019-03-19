
import { getList, getItem } from './model';
import factory from 'store/factory';

export default factory.createInstance({
  fetchList: getList,
  fetchItem: getItem,
  state: {
    showTimeLimitRuleModal: false,
    bomCode: '',
    showBoxRangeModal: false,
    limitRuleId: '',
    showOperationRecordModal: false,
    showEditTimeLimitRuleModal: false,
    isEdit: false,
    showSelectBoxModal: false
  },
  mutation: {
    setTimeLimitRuleModal (state, val) {
      state.showTimeLimitRuleModal = val;
    },
    setBomCode (state, val) {
      state.bomCode = val;
    },
    setBoxRangeModal (state, val) {
      state.showBoxRangeModal = val;
    },
    setLimitRuleId (state, val) {
      state.limitRuleId = val;
    },
    setOperationRecordModal (state, val) {
      state.showOperationRecordModal = val;
    },
    setEditTimeLimitRuleModal (state, val) {
      state.showEditTimeLimitRuleModal = val;
    },
    setIsEdit (state, val) {
      state.isEdit = val;
    },
    setSelectBoxModal (state, val) {
      state.showSelectBoxModal = val;
    }
  },
  action: {
    editLimitRulesAction ({ commit }, val) {
      commit('setEditTimeLimitRuleModal', true);
      commit('setLimitRuleId', val);
      commit('setIsEdit', true);
    }
  }
});

export const STORE_NAME = 'purchasingRules';
