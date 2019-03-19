/**
 * 确认支付模型
 * 没用
 */

import apiPayment from '@/api/order/payment';
// import apiJoin from '@/api/distribution/join-relation';
const getPaylist = async (data) => {
  let result = await apiPayment(data);
  if (result.success) {
    let data = result.data;
    result.data = {
      'Orderamount': data.Order_amount // 订单金额
    //   'withdrawCommission': data.withdraw_commission, // 已提奖励金
    //   'activeCommission': data.active_commission, // 可提取奖励金
    //   'totalCommission': data.total_commission, // 奖励金池
    //   'withdrawCount': data.withdraw_count, // 提现明细
    //   'commissionCount': data.commission_count, // 奖励明细
    //   'subordinateCount': data.subordinate_count, // 我的小伙伴
    //   'withdrawSill': data.withdraw_sill // 提现门槛
    };
  }
};

export {
  getPaylist
};
