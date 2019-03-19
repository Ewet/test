import apiGetBoxId from 'api/realTimeStatus/get-boxId';

import formatResult from './formatResult';

const getBoxId = async x => {
  let result = await apiGetBoxId();
  return formatResult(result);
};
export {
  getBoxId
};
