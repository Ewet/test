import apiGetList from './api/get-list';
import apiGetItem from './api/get-item';
import apiAddItem from './api/add-item';
import apiDelItem from './api/del-item';
import apiUpdateItem from './api/update-item';
import formatResult from 'model/formatResult';
import listResult from 'model/listResult';

const getList = async data => formatResult(listResult(await apiGetList(data), x => ({
  departmentName: x.dep_name,
  id: x.id
})));
const getItem = async (id) => {
  const result = await apiGetItem({
    id
  });
  if (result.success) {
    result.data = {
      departmentName: result.data.dep_name,
      id: result.data.id
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
