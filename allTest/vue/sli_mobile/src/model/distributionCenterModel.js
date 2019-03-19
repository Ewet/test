/**
 * 我的奖励中心模型
 */

import apiHome from '@/api/distribution/home';
import formatResult from './formatResult';
import apiJoin from '@/api/distribution/join-relation';
const getHome = async (data) => {
  let result = await apiHome(data);
  if (result.success) {
    let data = result.data;
    result.data = {
      'withdrawCommission': data.withdraw_commission, // 已提奖励金
      'activeCommission': data.active_commission, // 可提取奖励金
      'totalCommission': data.total_commission, // 奖励金池
      'withdrawCount': data.withdraw_count, // 提现明细
      'commissionCount': data.commission_count, // 奖励明细
      'subordinateCount': data.subordinate_count, // 我的小伙伴
      'withdrawSill': data.withdraw_sill, // 提现门槛
      'level': data.trader_type_formatted || '普通会员'// 会员等级
    };
  }
  return formatResult(result);
};

const join = async (data) => {
  return formatResult(await apiJoin(data));
};

export {
  getHome,
  join
};
