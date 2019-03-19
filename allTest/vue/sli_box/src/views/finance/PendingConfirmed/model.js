
import apiGetOrderDetail from './api/sn-info';
// import apiRefundItem from './api/refund-item';
import apiRefundItem from './api/refund-audit';
import apiCheckItem from './api/check-item';
import apiGetList from './api/get-list';
import apiGetItem from './api/get-item';
import apiAuditApply from './api/apply-audit';
import apiAuditStock from './api/stock-audit';
import formatResult from 'model/formatResult';
import apiGetStatus from './api/get-status';
// import formatItem from 'model/formatItem';
import listResult from 'model/listResult';
// 列表
const getList = async data => formatResult(listResult(await apiGetList(data), x => ({
  boxId: x.box_id,
  userId: x.user_id,
  orderType: x.order_type_formatted,
  type: x.order_type,
  returnTime: x.created_time_formatted,
  refundSn: x.refund_sn,
  refundId: x.refund_id,
  quantity: x.quantity,
  refundAmount: x.refund_amount,
  orderSn: x.order_sn,
  paymentMethod: x.payment_method_formatted,
  status: x.status_formatted,
  refundDesc: x.refund_desc,
  reason: x.reason
})));
const getItem = async (refundId) => {
  const result = await apiGetItem({
    refund_id: refundId
  });
  if (result.success) {
    const data = result.data;
    result.data = {
      returnTime: data.created_time_formatted,
      refundSn: data.refund_id,
      refundAmount: data.refund_amount,
      reason: data.reason,
      items: data.details.map(d => ({
        goodsName: d.goods.goods_name,
        price: d.price,
        quantity: d.quantity,
        totalprice: d.amount
      }))
    };
  }
  return formatResult(result);
};
// 订单详情
const getOrderDetail = async (orderSn) => {
  const result = await apiGetOrderDetail({
    order_sn: orderSn
  });
  if (result.success) {
    const x = result.data;

    result.data = {
      orderId: x.order_id,
      orderSn: x.order_sn,
      orderType: x.order_type,
      createTime: x.created_time_formatted,
      willReceive: x.order_total,
      realReceive: x.real_total,
      shipStatus: x.status_formatted,
      payMode: x.payment_method_formatted,
      // payMode: x.pay_mode_formatted,
      payTime: x.paid_time_formatted,
      nickName: x.customer.nickname,
      mobile: x.customer.mobile,
      couponDeduction: x.coupon_deduction,
      randomDeduction: x.random_deduction,
      goods: x.details.map(d => ({
        quantity: d.quantity,
        price: d.price,
        goodsName: d.goods.goods_name
      })),
      merchantName: x.merchant.name,
      merchantAddress: x.merchant.address,
      boxNo: x.box.box_no,
      boxAddress: x.box.address,
      purchasingName: x.purchasing.name,
      purchasingMobile: x.purchasing.mobile
    };
  }
  return formatResult(result);
};

const refundItem = async params => formatResult(await apiRefundItem(params));
const checkItem = async refundId => formatResult(await apiCheckItem({
  refund_id: refundId
}));
// 普通订单
const auditApply = async params => formatResult(await apiAuditApply(params));
const auditStock = async params => formatResult(await apiAuditStock(params));
// 筛选状态枚举
const getStatus = async () => formatEnumResult(await apiGetStatus({ param_key: 'wd_box_refund_status' }), true);
const formatEnumResult = ({ success, data, msg }, addAll = true) => {
  if (success) {
    data = data.map(x => ({
      name: x.enum_name,
      value: x.enum_id
    }));
    // if (addAll) {
    //   data.unshift({
    //     name: '全部',
    //     value: '-1'
    //   });
    // }
  }
  return { success, data, msg };
};
export {
  getList,
  getItem,
  getOrderDetail,
  refundItem,
  checkItem,
  getStatus,
  auditApply,
  auditStock
};
