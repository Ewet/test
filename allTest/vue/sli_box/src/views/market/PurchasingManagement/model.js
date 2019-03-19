import apiGetList from './api/get-list';
import apiGetMemberList from 'views/personnel/Member/api/get-all-list';
import apiUpdateItem from './api/update-item';
import apiAddItem from './api/add-item';
import apiDelItem from './api/del-item';
import apiGetItem from './api/get-item';
import apiEnable from './api/enable';
import apiGetExcel from './api/export';
import listResult from 'model/listResult';
import formatResult from 'model/formatResult';

import apiGetMerchantList from 'views/system/MerchantManagement/api/get-all-list';

// 商户列表
const getMerchantList = async (data) => {
  const result = await apiGetMerchantList(data);
  const resultData = result.data.items;
  if (result.success) {
    result.data.items = resultData.map(x => ({
      label: x.name, // 商户名称
      value: x.merchant_id // 商户ID
    }));
  }
  return formatResult(result);
};

// 会员列表
const getMemberList = async (data) => {
  const result = await apiGetMemberList(data);
  const resultData = result.data.items;
  if (result.success) {
    result.data.items = resultData.map(x => ({
      weChatID: x.wxuser_id,
      name: x.realname,
      mobileAdd: x.mobile,
      nickname: x.nickname,
      avatar: x.avatar,
      gender: x.gender,
      gender_formatted: x.gender_formatted,
      mobile_verified: x.mobile_verified,
      mobile_verified_formatted: x.mobile_verified_formatted,
      updated_time: x.updated_time,
      updated_time_formatted: x.updated_time_formatted,
      created_time: x.created_time,
      created_time_formatted: x.created_time_formatted,
      id: x.user_id
    }));
  }
  return formatResult(result);
};

// 代购员管理列表
const getList = async data => formatResult(listResult(await apiGetList(data), x => ({
  createdTime: x.created_time_formatted, // 新增时间
  merchant: x.merchant_name, // 所属商户
  name: x.agent_name, // 姓名
  mobile: x.mobile, // 手机号码
  nickname: x.nickname, // 微信昵称
  wxuserId: x.wxuser_id, // 微信ID
  reviewer: x.auditor, // 审核人
  status: x.status, // 1:使用中（显示删除按钮）2：已删除（显示启用按钮）
  id: x.user_id // 用户id
})));

// 代购员管理详情
const getItem = async (id) => {
  const result = await apiGetItem({
    user_id: id
  });
  if (result.success) {
    const data = result.data;
    let items = result.data.extraBoxs;
    items = items.map(item => ({
      merchantName: item.name, // 商户名称
      boxNo: item.box_no, // 盒子编码
      boxId: item.box_id // 盒子Id
    }));
    result.data = {
      name: data.name, // 补货员姓名
      mobile: data.mobile, // 手机号
      nickname: data.nickname, // 微信昵称
      merchant: data.merchant_name, // 所属商户
      itemList: items, // 代购范围
      merchantId: data.merchant_id, // 商户id
      wxuserId: data.wxuser_id, // 微信用户id
      id: data.user_id // 用户id
    };
  }
  return formatResult(result);
};

// 新增代购员
const addItem = async (data) => {
  const result = await apiAddItem(data);
  return formatResult(result);
};

// 更新代购员
const updateItem = async (data) => {
  const result = await apiUpdateItem(data);
  return formatResult(result);
};

// 删除代购员
const delItem = async (id) => {
  const result = await apiDelItem({
    user_id: id
  });
  return formatResult(result);
};

// 代购员管理-启用
const enableItem = async (id) => {
  const result = await apiEnable({
    user_id: id
  });
  return formatResult(result);
};

// 导出
const getExcel = (data) => {
  apiGetExcel(data);
};

export {
  getList,
  addItem,
  updateItem,
  delItem,
  getItem,
  getExcel,
  getMemberList,
  getMerchantList,
  enableItem
};
