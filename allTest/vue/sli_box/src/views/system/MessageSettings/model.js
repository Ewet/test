import apiGetList from './api/get-list';
import apiGetItem from './api/get-item';
import apiUpdateItem from './api/update-item';
import apiClosePush from './api/closePush';
import apiPushOn from './api/pushOn';

import formatResult from 'model/formatResult';
import listResult from 'model/listResult';

// 活动列表
const getList = async data => formatResult(listResult(await apiGetList(data), x => ({
  department: x.dep_name, // 部门
  name: x.work_name, // 员工姓名
  account: x.name, // 登陆账号
  phone: x.mobile, // 手机号
  pushTime: x.from_time && x.to_time ? `${x.from_time}-${x.to_time}` : '', // 推送时间
  pushDate: x.push_data, // 推送日期
  pushStatus: x.is_active, // 推送状态（是否开启推送）
  settingId: x.setting_id, // 设置ID
  id: x.admin_id // 员工ID
})));
// 推送设置详情
const getItem = async (Id) => {
  const result = await apiGetItem({
    admin_id: Id
  });
  if (result.success) {
    const data = result.data;
    result.data = {
      startTime: data.from_time, // 值班开始时间
      endTime: data.to_time, // 值班结束时间
      weeks: [
        { name: 'monday', value: data.monday },
        { name: 'tuesday', value: data.tuesday },
        { name: 'wednesday', value: data.wednesday },
        { name: 'thursday', value: data.thursday },
        { name: 'friday', value: data.friday },
        { name: 'saturday', value: data.saturday },
        { name: 'sunday', value: data.sunday }
      ],
      settingId: data.setting_id, // 设置ID
      id: data.admin_id // 员工ID
    };
  }
  return formatResult(result);
};

const updateItem = async params => formatResult(await apiUpdateItem(params));

// 关闭推送
const closePush = async id => formatResult(await apiClosePush({
  admin_id: id
}));
// 开启推送
const pushOn = async id => formatResult(await apiPushOn({
  admin_id: id
}));

export {
  getList,
  getItem,
  updateItem,
  closePush,
  pushOn
};
