
import apiGetList from './api/get-list';
import apiCreateItem from './api/create-item';
import apiModifyItem from './api/modify-item';
import apiDelItem from './api/del-item';
import apiGetRemarks from './api/get-info';

import formatResult from 'model/formatResult';
import listResult from 'model/listResult';

// 盒子列表
const getList = async data => formatResult(listResult(await apiGetList(data), x => ({
  firmwareId: x.firmwares_id,
  uploadTime: x.created_formatted,
  firmwareType: x.firmwares_type,
  firmwareName: x.file_name,
  firmwareSize: x.size,
  versionNum: x.version,
  fitBox: x.type_formatted,
  uploadsName: x.user_name,
  uploadsResult: x.upload_results_formatted,
  remarks: x.remarks
})));

const createItem = async params => formatResult(await apiCreateItem(params));
const modifyItem = async params => formatResult(await apiModifyItem(params));
const delItem = async firmwaresId => formatResult(await apiDelItem({
  firmwares_id: firmwaresId
}));
const getRemarks = async firmwaresId => formatResult(await apiGetRemarks({
  firmwares_id: firmwaresId
}));

export {
  getList,
  createItem,
  modifyItem,
  delItem,
  getRemarks
};
