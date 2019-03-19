import apiGetBoxStatus from './api/get-status';
import apiOpenDoor from './api/open-door';
import apiCorrect from './api/correct';

import formatResult from 'model/formatResult';

// 本地的实时状态数据，线上使用实时的接口，这个用不上；
const getBoxStatus = async (boxId) => {
  const result = await apiGetBoxStatus(boxId);
  return formatResult(result);
};

const openDoor = async (boxId) => {
  const result = await apiOpenDoor({
    box_id: boxId
  });
  return formatResult(result);
};
const correct = async (data) => {
  const result = await apiCorrect(data);
  return formatResult(result);
};

export {
  getBoxStatus,
  openDoor,
  correct
};
