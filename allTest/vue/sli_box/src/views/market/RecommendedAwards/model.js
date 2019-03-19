import apiGetList from './api/get-list';
import apiGetItem from './api/get-item';
import apiAddItem from './api/add-item';
import apiDelItem from './api/del-item';
import apiUpdateItem from './api/update-item';
import apistartActivity from './api/start';
import apiendActivity from './api/end';
import apiGetAwardInfo from './api/get-award-info';

import formatResult from 'model/formatResult';
import listResult from 'model/listResult';

// 活动列表
const getList = async data => formatResult(listResult(await apiGetList(data), x => ({
  activityName: x.activity_name, // 活动名称
  activeState: x.status_format, // 活动状态
  activeStateBackstage: x.status, //  活动状态 0：待开始 10：进行中 20 已结束
  builtMan: x.nickname, // 新建人
  createdTime: x.created_time_format, // 新建时间
  activityTime: `${x.start_time_format}<br/>${x.end_time_format}`, // 活动时间
  remainingTime: x.remaining_time_format, // 活动剩余时间
  id: x.activity_id // 活动ID
})));

// 活动详情
const getItem = async (activityId) => {
  const result = await apiGetItem({
    activity_id: activityId
  });
  if (result.success) {
    const data = result.data;
    result.data = {
      activityId: data.activity_id,
      activityName: data.activity_name, //   创建名称
      startTime: data.start_time_formatted, //   活动开始时间
      endTime: data.end_time_formatted, //   活动结束时间
      amount: data.amount_formatted, // 奖励金额
      limit: data.boundary, // 奖励限制次数
      rounderId: data.created_by, // 活动创建人ID
      rounder: data.nickname, // 活动创建人名称
      creatTime: data.created_time_formatted, // 活动创建时间
      activityState: data.status_formatted // 活动状
    };
  }
  return formatResult(result);
};
const addItem = async params => formatResult(await apiAddItem(params));
const updateItem = async params => formatResult(await apiUpdateItem(params));
const delItem = async id => formatResult(await apiDelItem({
  activity_id: id
}));
// 开始活动
const startActivity = async id => formatResult(await apistartActivity({
  activity_id: id
}));

// 结束活动
const endActivity = async id => formatResult(await apiendActivity({
  activity_id: id
}));

// 代购员邀请奖励金查看
const getAwardInfo = async data => formatResult(listResult(await apiGetAwardInfo(data), x => ({
  awardTime: x.award_time, // 奖励时间
  amount: x.amount, // 奖励金额
  awardId: x.award_id, // 奖励ID
  activityId: x.activity_id, // 推荐活动ID
  inviterUserId: x.inviter_user_id, // 邀请人的用户ID
  inviteeUserId: x.invitee_user_id // 被邀请人的用户ID

})));

// 查看活动信息
// const getActivityInfo = async activityId => {
//   let result = await apiGetItem({
//     activity_id: activityId
//   });
//   if (result.success) {
//     let data = result.data;
//     result.data = {
//       'activityId': data.activity_id,
//       'activityName': data.activity_name, //   创建名称
//       'startTime': data.start_time_formatted, //   活动开始时间
//       'endTime': data.end_time_formatted, //   活动结束时间
//       'amount': data.amount_formatted, // 奖励金额
//       'limit': data.boundary // 奖励限制次数
//     };
//   }
//   return formatResult(result);
// };

export {
  getList,
  getItem,
  addItem,
  updateItem,
  delItem,
  startActivity,
  endActivity,
  getAwardInfo
};
