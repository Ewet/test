import apiGetList from './api/get-list';
import apiExportReport from './api/export';

import formatResult from 'model/formatResult';
// import formatItem from 'model/formatItem';
import listResult from 'model/listResult';

// 订单报表
const getList = async data => formatResult(listResult(await apiGetList(data), x => ({
  merchantName: x.name, // 商户
  boxNo: x.box_no, // 编号
  orderType: x.order_type_formatted, // 类型
  orderSn: x.order_sn, // 单号
  orderAmount: x.order_total, // 订单金额
  paidAmount: x.real_receive, // 实收（元）
  refund: x.refunded_total, // 退款（元）
  couponAmount: x.coupon_deduction, // 优惠劵（元）
  randomreduction: x.random_deduction, // 随机减（元）
  orderStatus: x.status_formatted, // 订单状态
  paymentMethod: x.payment_method_formatted, // 支付方式
  orderTime: x.created_time_formatted, // 下单时间
  paymentTime: x.paid_time_formatted, // 支付时间
  orderId: x.order_id, // 订单ID
  cellClassName: {
    refund: x.refunded_total > 0 ? 'red' : '',
    randomreduction: x.random_deduction > 0 ? 'red' : '',
    couponAmount: x.coupon_deduction > 0 ? 'red' : ''
  }

})));

const exportReport = (params) => {
  apiExportReport(params);
};

export {
  getList,
  exportReport
};
