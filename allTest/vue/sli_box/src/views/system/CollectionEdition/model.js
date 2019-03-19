
import apiGetList from './api/get-list';
import apiGetItem from './api/get-item';
import apiAddItem from './api/add-item';
import apiDelItem from './api/del-item';
import apiUpdateItem from './api/update-item';

import formatResult from 'model/formatResult';
import listResult from 'model/listResult';

// 采集板列表
const getList = async data => formatResult(listResult(await apiGetList(data), x => ({
  collectionNumber: x.acquisition_no,
  edition: x.hw_version,
  extendedEditionNumber: x.number_of_extensions,
  buildTime: x.created_formatted,
  mcbId: x.mcb_id,
  id: x.acquisition_id
})));

const getItem = async (masterControlId) => {
  const result = await apiGetItem({
    masterControlId
  });
  if (result.success) {
    const data = result.data;
    result.data = {
      collectionNumber: data.acquisition_no,
      edition: data.hw_version,
      extendedEditionNumber: data.number_of_extensions,
      buildTime: data.created_time_formatted,
      id: data.id
    };
  }
  return formatResult(result);
};
const addItem = async params => formatResult(await apiAddItem(params));
const updateItem = async params => formatResult(await apiUpdateItem(params));
const delItem = async masterControlId => formatResult(await apiDelItem({
  acquisition_id: masterControlId
}));
export {
  getList,
  getItem,
  addItem,
  updateItem,
  delItem
};
