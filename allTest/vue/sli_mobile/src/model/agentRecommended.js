/**
 * 代购员推荐
 */
import apiGetAwardInfo from '@/api/agentRecommended/get-award-info';
import listResultModel from './listResultModel';
import formatResult from './formatResult';

// 代购员邀请奖励金查看
const getAwardInfo = async (data) => {
  let result = await apiGetAwardInfo(data);
  return formatResult(listResultModel(result, (item) => {
    return {
      'amount': item.amount, // 奖励金额
      'inviterUserId': item.inviter_user_id, // 邀请人ID
      'awardTimeFormatted': item.award_time_formatted, // 奖励时间
      'activityId': item.activity_id, // 活动ID
      'inviteeUserId': item.invitee_user_id, // 被邀请人ID
      'awardId': item.award_id // 奖励ID
    };
  }));
};

export {
  getAwardInfo
};
