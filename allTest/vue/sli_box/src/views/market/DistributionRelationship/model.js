import apiGetList from './api/get-list';
import listResult from 'model/listResult';
import formatResult from 'model/formatResult';

const getList = async data => formatResult(listResult(await apiGetList(data), x => ({
  // 上级名/头像
  superior: '13800138000',
  // 上级头像
  avatar: x.avatar,
  // 上级id
  userId: x.user_id,
  // 粉丝-头像
  subordinateAvatar: x.subordinate.avatar,
  // 粉丝-姓名
  subordinateNickname: x.subordinate.nickname,
  // 姓名/手机-姓名
  subordinateMobile: x.subordinate.mobile,
  // 累计佣金
  cumulativeCommission: x.total_commission,
  // 打款佣金
  paymentCommission: x.total_grant,
  // 注册时间
  registrationTime: x.create_time_formatted,
  // 审核时间
  auditTime: x.audi_time_formatted,
  // 状态
  status: x.status_formatted,
  // 关注
  subscribe: x.subscribe_formatted
})));
export {
  getList
};
