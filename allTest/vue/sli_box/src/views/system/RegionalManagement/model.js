import apiGetList from './api/get-list';
import apiGetItem from './api/get-item';
import apiAddItem from './api/add-area';
import apiDelItem from './api/del-area';
import apiUpdateItem from './api/update-area';
import formatResult from 'model/formatResult';
// import formatItem from './formatItem';
import listResult from 'model/listResult';

const getItem = async (id) => {
  const result = await apiGetItem(
    {
      district_id: id
    }
  );
  if (result.success) {
    const data = result.data;
    result.data = {
      districtId: data.district_id,
      districtName: data.district_name
    };
  }
  return formatResult(result);
};
// 地区
const getList = async data => formatResult(listResult(await apiGetList(data), x => ({
  districtId: x.district_id,
  districtName: x.district_name
})));
const addItem = async params => formatResult(await apiAddItem(params));
const updateItem = async params => formatResult(await apiUpdateItem(params));
const delItem = async districtId => formatResult(await apiDelItem({
  district_id: districtId
}));
export {
  getList,
  getItem,
  addItem,
  updateItem,
  delItem
};
