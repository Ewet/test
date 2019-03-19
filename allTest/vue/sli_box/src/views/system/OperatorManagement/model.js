
import apiGetList from './api/get-list';
import apiGetItem from './api/get-item';
import apiAddItem from './api/add-item';
import apiDelItem from './api/del-item';
import apiUpdateItem from './api/update-item';
import apiLandingSetting from './api/get-sign-in-info';
import apiUpdateSignIn from './api/update-sign-in';

import formatResult from 'model/formatResult';
import listResult from 'model/listResult';

// 运营商列表
const getList = async data => formatResult(listResult(await apiGetList(data), x => ({
  creatTime: x.created_time_formatted, // 新增时间
  name: x.name, // 运营商名称
  account: x.username, // 登录账号
  boxNumber: x.box_number, // 盒子数量
  address: x.address, // 地址
  administrator: x.contact_name, // 管理员
  phone: x.contact_phone, // 联系电话
  operatorNo: x.operator_no, // 运营商编号
  id: x.operator_id // 运营商id
})));

const getItem = async (Id) => {
  const result = await apiGetItem({
    operator_id: Id
  });
  if (result.success) {
    const data = result.data;
    result.data = {
      creatTime: data.created_time_formatted, // 创建时间
      name: data.name, // 运营商名称
      operatorNo: data.operator_no, // 运营商编号
      address: data.address, // 地址
      administrator: data.contact_name, // 联系人
      legal: data.legal_person, // 法人代表
      phone: data.contact_phone, // 联系电话
      id: data.operator_id // 运营商ID
    };
  }
  return formatResult(result);
};

const getLandingSetting = async (Id) => {
  const result = await apiLandingSetting({
    merchant_id: Id
  });
  if (result.success) {
    const data = result.data;
    result.data = {
      account: data.account,
      password: data.password,
      id: data.id
    };
  }
  return formatResult(result);
};
const addItem = async params => formatResult(await apiAddItem(params));
const updateItem = async params => formatResult(await apiUpdateItem(params));
const delItem = async Id => formatResult(await apiDelItem({
  operator_id: Id
}));
const updateSignInInfo = async params => formatResult(await apiUpdateSignIn(params));

export {
  getList,
  getItem,
  addItem,
  updateItem,
  delItem,
  getLandingSetting,
  updateSignInInfo
};
