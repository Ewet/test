
import apiGetList from './api/get-list';
import apiGetExcel from './api/export';
import formatResult from 'model/formatResult';
import listResult from 'model/listResult';
// 列表
const getList = async data => formatResult(listResult(await apiGetList(data), x => ({
  orderId: x.order_id,
  orderSn: x.order_sn,
  merchantName: x.name,
  boxNo: x.box_no,
  type: x.order_type,
  goodsName: x.goods_name,
  bomCode: x.barcode,
  unitPrice: x.price, // 单价
  quantity: x.quantity, // 数量
  returnQuantity: x.refunded_quantity, // 退货数量
  salesTime: x.created_time, // 销售时间
  salesTimeFormatted: x.created_time_formatted,
  salesAmount: x.order_total, // 销售金额
  reliefAmount: x.remission, // 减免金额
  paidAmount: x.net_receipts, // 实收金额
  costPrice: x.cost, // 成本单价
  costAmount: x.amounttocost, // 成本金额
  purchasingCommission: x.purchasing_commission, // 代购佣金 字段未定
  grossProfitAmount: x.maori, // 毛利金额
  grossProfitMargin: x.gross_margin, // 毛利率
  refundedTotal: x.refunded_total, // 退款
  randomDeduction: x.random_deduction, // 随机减
  couponDeduction: x.coupon_deduction, // 优惠券减免
  agentCommission: x.agent_commission, // 代购佣金
  cellClassName: {
    refundedTotal: x.refunded_total > 0 ? 'red' : '',
    randomDeduction: x.random_deduction > 0 ? 'red' : '',
    couponDeduction: x.coupon_deduction > 0 ? 'red' : '',
    grossProfitMargin: x.gross_margin === 0 && x.net_receipts === 0 ? 'blue' : ''
  }
})));
const getExcel = (data) => {
  apiGetExcel(data);
};

export {
  getList,
  getExcel
};
