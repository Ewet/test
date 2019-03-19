import apiGetList from './api/get-list';
import apiExportTable from './api/export';
import formatResult from 'model/formatResult';
import listResult from 'model/listResult';

// 代购员推荐活动-奖励记录
const getList = async data => formatResult(listResult(await apiGetList(data), x => ({
  awardTime: x.award_time_formatted, // 奖励时间
  acvitityName: x.activity_name, //  活动名称
  inviterUserId: x.inviter_user_id, // 用户ID
  username: x.username, // 用户名称
  amount: x.amount, // 奖励金额
  amountFormatted: `${x.amount_formatted} 元奖励金` // 奖励金额
})));
const exportTable = (params) => {
  apiExportTable(params);
};
export {
  getList,
  exportTable
};
