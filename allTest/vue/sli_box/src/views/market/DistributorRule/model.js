import apiGetList from './api/get-list';
import apiUpdateItem from './api/update-item';
import apiAddItem from './api/add-item';
import apiDelItem from './api/del-item';
import apiGetItem from './api/get-item';
import listResult from 'model/listResult';
import formatResult from 'model/formatResult';

const getList = async data => formatResult(listResult(await apiGetList(data), x => ({
  levelName: x.name,
  level: x.level,
  proportion: x.proportion,
  activeTime: x.active_time_formatted,
  id: x.rule_id,
  toplimit: x.toplimit,
  isdefault: x.is_default,
  isdefaultformatted: x.is_default_formatted
})));
const getItem = async (id) => {
  const result = await apiGetItem({
    rule_id: id
  });
  if (result.success) {
    const data = result.data;
    result.data = {
      levelName: data.name,
      level: data.level,
      proportion: data.proportion,
      activeTime: data.active_time_formatted,
      id: data.rule_id,
      toplimit: data.toplimit,
      isdefault: data.is_default,
      isdefaultformatted: data.is_default_formatted
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
    rule_id: id
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
