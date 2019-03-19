import { exponsionBoardMutation } from '../ExpansionBoard/store';

const mutationBoxManagement = {
  setModalCollectionEditionList (state, val) {
    state.showModalCollectionEditionList = val;
  },
  setModalStructureManagement (state, val) {
    state.showModalStructureManagement = val;
  },
  setBoxId (state, val) {
    state.boxId = val;
  },
  setBoxNo (state, val) {
    state.boxNub = val;
  },
  setMcbId (state, val) {
    state.mcbId = val;
  },
  setLayerId (state, val) {
    state.layerId = val;
  },
  setCargoAreaEditModal (state, val) {
    state.showCargoAreaEditModal = val;
  }
};

export default Object.assign(
  mutationBoxManagement,
  exponsionBoardMutation
);
