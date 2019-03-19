import apiGetList from './api/get-list';
import apiUpdateItem from './api/update-item';
import apiGetItem from './api/get-item';
import listResult from 'model/listResult';
import formatResult from 'model/formatResult';

const getList = async data => formatResult(listResult(await apiGetList(data), x => ({
  name: x.type_name,
  price: x.threshold,
  desc: x.type_desc,
  id: x.type_key
})));
const getItem = async (id) => {
  const result = await apiGetItem({
    type_key: id
  });
  if (result.success) {
    const data = result.data;
    result.data = {
      name: data.type_name,
      price: data.threshold,
      desc: data.type_desc,
      id: data.type_key
    };
  }
  return formatResult(result);
};

const updateItem = async (data) => {
  const result = await apiUpdateItem(data);
  return formatResult(result);
};

export {
  getList,
  updateItem,
  getItem
};
