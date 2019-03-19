import { getList, getItem } from './model';
import factory from 'store/factory';
import tips from 'utils/tips';

export const STORE_NAME = 'employeeManagement';
export default factory.createInstance({
  fetchList: getList,
  fetchItem: getItem,
  state: {
    showRoleModal: false,
    showAreaModal: false,
    showBatchAuthModal: false,
    batchForm: {
      areaItems: [],
      roleItems: []
    }
  },
  mutation: {
    setRoleModal (state, val) {
      if (val === false) {
        state.itemId = '';
      }
      state.showRoleModal = val;
    },
    setAreaModal (state, val) {
      if (val === false) {
        state.itemId = '';
      }
      state.showAreaModal = val;
    },
    setBatchAuth (state, val) {
      if (val === false) {
        state.batchForm = {
          areaItems: [],
          roleItems: []
        };
      }
      state.showBatchAuthModal = val;
    },
    addAreaItem (state, areaItem) {
      const areaItems = state.batchForm.areaItems;
      if (!areaItems.some(x => x.value === areaItem.value)) {
        areaItems.push(areaItem);
        tips.success('添加成功');
      } else {
        tips.error('重复添加');
      }
    },
    addRoleItem (state, roleItem) {
      const roleItems = state.batchForm.roleItems;
      if (!roleItems.some(x => x.value === roleItem.value)) {
        roleItems.push(roleItem);
        tips.success('添加成功');
      } else {
        tips.error('重复添加');
      }
    }
  }
});
