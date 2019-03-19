
import apiGetList from './api/get-list';
import apiGetItem from './api/get-item';
import apiAddItem from './api/add-item';
import apiDelItem from './api/del-item';
import apiUpdateItem from './api/update-item';

import formatResult from 'model/formatResult';
import listResult from 'model/listResult';

// 盒子列表
const getList = async data => formatResult(listResult(await apiGetList(data), x => ({
  adId: x.advert_id,
  uploadTime: x.created_time_formatted,
  adName: x.advert_name,
  advertiser: x.advert_merchants_name,
  quantity: x.devote_num,
  remark: x.notes,
  uploadedBy: x.created_by,
  fileId: x.file_id,
  fileUrl: x.file_url
})));

const getItem = async (id) => {
  const result = await apiGetItem({
    id
  });
  if (result.success) {
    const data = result.data;
    result.data = {
      adId: data.advert_id,
      adName: data.advert_name,
      advertiser: data.advert_merchants_name,
      fileUrl: data.file_url,
      fileId: data.file_id,
      remark: data.notes
    };
  }
  return formatResult(result);
};
const addItem = async params => formatResult(await apiAddItem(params));
const updateItem = async params => formatResult(await apiUpdateItem(params));
const delItem = async id => formatResult(await apiDelItem({
  id
}));

export {
  getList,
  getItem,
  addItem,
  updateItem,
  delItem
};
