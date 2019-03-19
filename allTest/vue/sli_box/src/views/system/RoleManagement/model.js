import apiGetList from './api/get-list';
import apiGetItem from './api/get-item';
import apiAddItem from './api/add-item';
import apiDelItem from './api/del-item';
import apiUpdateItem from './api/update-item';
import formatResult from 'model/formatResult';
import listResult from 'model/listResult';

const getList = async data => formatResult(listResult(await apiGetList(data), x => ({
  roleName: x.role_name,
  roleDesc: x.notes,
  id: x.id
})));
const getItem = async (roleId) => {
  const result = await apiGetItem({
    id: roleId
  });
  if (result.success) {
    const data = result.data;
    result.data = {
      roleName: data.info.role_name,
      roleDesc: data.info.notes,
      id: data.info.id,
      checkedKeys: data.menu.map(e => e.id)
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
