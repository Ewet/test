import apiGetList from './api/get-list';
import apiExportList from './api/export';

import formatResult from 'model/formatResult';
import listResult from 'model/listResult';

const getList = async data => formatResult(listResult(await apiGetList(data), x => ({
  orderSn: x.order_sn, // 订单号
  paidTime: x.paid_time_formatted, // 支付时间
  goodsName: x.goods_name, // 商品名称
  quantity: x.quantity, // 商品数量
  price: x.price_formatted, // 商品单价/分
  actualPayment: x.actual_payment_formatted, // 实收金额
  refundedMoney: x.refunded_money_formatted, // 退款金额
  ruleName: x.rule_name, // 分成规则
  proportion: x.proportion_formatted, // 分成比例
  shareAmount: x.share_amount_formatted, // 分成金额
  id: x.id// 规则ID
})));

const exportList = async (data) => {
  apiExportList(data);
};
export {
  getList,
  exportList
};
