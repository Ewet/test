
import apiGetList from './api/get-list';
import apiGetExcel from './api/export';
import formatResult from 'model/formatResult';
import listResult from 'model/listResult';
// 列表
const getList = async data => formatResult(listResult(await apiGetList(data), x => ({
  operatorName: x.operator_name,
  merchantName: x.name,
  merchantId: x.merchant_id,
  boxNo: x.box_no,
  boxId: x.box_id,
  paidTime: x.paid_time, // 收款时间
  paidTimeFormatted: x.paid_time_formatted,
  paidAmount: x.real_receive, // 实收
  refundedTotal: x.refunded_total, // 退款
  randomDeduction: x.random_deduction, // 随机减
  couponDeduction: x.coupon_deduction, // 优惠券减免
  cellClassName: {
    refundedTotal: x.refunded_total > 0 ? 'red' : '',
    randomDeduction: x.random_deduction > 0 ? 'red' : '',
    couponDeduction: x.coupon_deduction > 0 ? 'red' : ''
  }
})));
const getExcel = (data) => {
  apiGetExcel(data);
};

export {
  getList,
  getExcel
};
