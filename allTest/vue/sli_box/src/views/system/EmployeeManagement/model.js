import apiGetList from './api/get-list';
import apiGetItem from './api/get-item';
import apiDelItem from './api/del-item';
import apiAddItem from './api/add-item';
import apiUpdateItem from './api/update-item';
import apiSetRole from './api/set-role';
import formatResult from 'model/formatResult';
import listResult from 'model/listResult';

const getList = async data => formatResult(listResult(await apiGetList(data), x => ({
  employeeName: x.work_name,
  loginAccount: x.name,
  authList: x.authList,
  createTime: x.created_time_formatted,
  id: x.admin_id,
  departmentName: x.auth_department_name
})));

const delItem = async id => formatResult(await apiDelItem({
  id
}));

const getItem = async (employeeId) => {
  const result = await apiGetItem({
    id: employeeId
  });
  if (result.success) {
    const data = result.data;
    result.data = {
      employeeName: data.work_name,
      loginAccount: data.name,
      roleAuth: data.authList,
      createTime: data.created_time_formatted,
      phone: data.mobile,
      id: data.admin_id
    };
  }
  return formatResult(result);
};

const addItem = async params => formatResult(await apiAddItem(params));
const updateItem = async params => formatResult(await apiUpdateItem(params));

const setRole = async params => formatResult(await apiSetRole(params));

export {
  getList,
  delItem,
  getItem,
  addItem,
  updateItem,
  setRole
};
