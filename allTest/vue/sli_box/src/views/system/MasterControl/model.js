
import apiGetList from './api/get-list';
import apiGetItem from './api/get-item';
import apiAddItem from './api/add-item';
import apiDelItem from './api/del-item';
import apiUpdateItem from './api/update-item';

import formatResult from 'model/formatResult';
import listResult from 'model/listResult';

// 主控板列表
const getList = async data => formatResult(listResult(await apiGetList(data), x => ({
  IPAddress: x.ip_address,
  version: x.hw_version,
  time: x.created_formatted,
  boxId: x.box_id,
  id: x.mcb_id
})));

const getItem = async (masterControlId) => {
  const result = await apiGetItem({
    mcb_id: masterControlId
  });
  if (result.success) {
    const data = result.data;
    result.data = {
      IPAddress: data.ip_address,
      version: data.hw_version,
      boxId: data.box_id,
      id: data.mcb_id
    };
  }
  return formatResult(result);
};
const addItem = async params => formatResult(await apiAddItem(params));
const updateItem = async params => formatResult(await apiUpdateItem(params));
const delItem = async masterControlId => formatResult(await apiDelItem({
  mcb_id: masterControlId
}));
export {
  getList,
  getItem,
  addItem,
  updateItem,
  delItem
};
