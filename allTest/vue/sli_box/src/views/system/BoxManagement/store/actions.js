import { exponsionBoardAction } from '../ExpansionBoard/store';

const actionsBoxManagement = {
  // 弹出采集板列表
  async viewCollectionEditionList ({
    commit,
    dispatch
  }, params) {
    commit('setModalCollectionEditionList', true);
    commit('setMcbId', params);
    dispatch('collectionEdition/filterData', {
      mcb_id: params
    });
  },
  // 弹出主控板列表
  async viewStructureManagement ({
    commit,
    dispatch
  }, params) {
    commit('setModalStructureManagement', true);
    commit('setBoxId', params.box_id);
    commit('setBoxNo', params.box_no);
    dispatch('masterControl/filterData', {
      box_id: params.box_id
    });
  },
  // 弹出货区编辑
  async cargoAreaEdit ({
    commit,
    dispatch
  }, params) {
    commit('setCargoAreaEditModal', true);
    commit('setLayerId', params);
  }
};

export default Object.assign(
  actionsBoxManagement,
  exponsionBoardAction
);
