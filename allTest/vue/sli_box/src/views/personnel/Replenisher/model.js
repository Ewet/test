import apiGetList from './api/get-list';
import apiGetMemberList from 'views/personnel/Member/api/get-all-list';
import apiGetItem from './api/get-item';
import apiAddItem from './api/add-item';
import apiDelItem from './api/del-item';
import apiUpdateItem from './api/update-item';
import formatResult from 'model/formatResult';
import listResult from 'model/listResult';

const getMemberList = async (data) => {
  const result = await apiGetMemberList(data);
  const resultData = result.data.items;
  if (result.success) {
    result.data.items = resultData.map(x => ({
      weChatID: x.wxuser_id,
      name: x.realname,
      phone: x.mobile,
      weChatName: x.nickname,
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

const getList = async data => formatResult(listResult(await apiGetList(data), x => ({
  weChatID: x.wxuser_id,
  name: x.name,
  phone: x.mobile,
  updated_time: x.updated_time,
  updated_time_formatted: x.updated_time_fromat,
  created_time: x.created_time,
  created_time_formatted: x.created_time_fromat,
  id: x.user_id
})));

const getItem = async (userId) => {
  const result = await apiGetItem({
    user_id: userId
  });
  if (result.success) {
    const data = result.data;
    result.data = {
      weChatID: data.wxuser_id,
      name: data.name,
      phone: data.mobile,
      weChatName: data.nickname,
      avatar: data.headimgurl,
      gender: data.sex_format,
      updated_time: data.updated_time,
      updated_time_formatted: data.updated_time_fromat,
      created_time: data.created_time,
      created_time_formatted: data.created_time_fromat,
      id: data.user_id
    };
  }
  return formatResult(result);
};
const addItem = async params => formatResult(await apiAddItem(params));
const updateItem = async params => formatResult(await apiUpdateItem(params));
const delItem = async id => formatResult(await apiDelItem({
  user_id: id
}));

export {
  getList,
  getItem,
  addItem,
  updateItem,
  delItem,
  getMemberList
};
