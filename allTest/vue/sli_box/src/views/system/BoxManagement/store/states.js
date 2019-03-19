import {
  exponsionBoardState
} from '../ExpansionBoard/store';

const stateBoxManagement = {
  boxId: '',
  boxNub: '',
  mcbId: '',
  layerId: '', // 货区Id
  showModalCollectionEditionList: false,
  showModalStructureManagement: false,
  showCargoAreaEditModal: false
};

export default Object.assign(
  stateBoxManagement,
  exponsionBoardState
);
