import apiGetList from './api/get-list';
import apiUpdateItem from './api/update-item';
import apiAddItem from './api/add-item';
import apiDelItem from './api/del-item';
import apiGetItem from './api/get-item';
import listResult from 'model/listResult';
import formatResult from 'model/formatResult';

const getList = async data => formatResult(listResult(await apiGetList(data), x => ({
  reductionInterval: `${x.min_discount}%~${x.max_discount}%`,
  probability: x.probability,
  creatTime: x.create_time_formatted,
  id: x.random_id,
  updateTime: x.update_time_formatted
})));
const getItem = async (id) => {
  const result = await apiGetItem({
    random_id: id
  });
  if (result.success) {
    const data = result.data;
    result.data = {
      minDiscount: data.min_discount,
      maxDiscount: data.max_discount,
      probability: data.probability,
      id: data.random_id
    };
  }
  return formatResult(result);
};

const addItem = async (data) => {
  const result = await apiAddItem(data);
  return formatResult(result);
};

const updateItem = async (data) => {
  const result = await apiUpdateItem(data);
  return formatResult(result);
};

const delItem = async (id) => {
  const result = await apiDelItem({
    random_id: id
  });
  return formatResult(result);
};

export {
  getList,
  addItem,
  updateItem,
  delItem,
  getItem
};
