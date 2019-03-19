/**
 * 支付模型
 */
import apiPendingOrder from '@/api/payment/pending-order';
import apiGetInformation from '@/api/payment/get-information';
import apigetCouponDeduction from '@/api/payment/get-couponDeduction';
import apiGetWxpaySignature from '@/api/payment/get-wxpay-signature';
import apiLockOrder from '@/api/payment/lock-order';
// import listResultModel from './listResultModel';
import formatResult from './formatResult';
// 获取订单、商品列表
let pendingOrder = async (orderId) => {
  let result = await apiPendingOrder({
    order_id: orderId
  });
  if (result.success) {
    let data = result.data;
    result.data = {
      'isLock': data.is_locked, // 是否锁定
      'goods': data.order_goods.map(g => {
        return {
          'goodsImage': g.goods_image,
          'goodsName': g.goods_name,
          'num': g.goods_id,
          'price': g.price,
          'quanity': g.quantity
        };
      }),
      'coupons': data.order_coupon.map(g => {
        return {
          couponSn: g.coupon_sn
        };
      }),
      'orderType': data.order.order_type, // 订单类型
      'payStatus': data.order.pay_status, // 订单状态
      'payStatusFormat': data.order.pay_status_formatted, // 订单状态
      'storename': data.order.store_name, // 无
      'totalquantity': data.order.total_quantity || 0, // 商品总数,
      'total': data.order.order_total,
      'realReceive': data.order.real_receive, // 实收金额
      'willReceive': data.order.will_receive, // 应收

      'orderId': data.order.order_id,
      'orderUserId': data.order.user_id, // 订单user_id
      'couponDeduction': data.order.coupon_deduction, // 优惠券抵扣金额
      'pointsDeduction': data.order.points_deduction, // 积分抵扣金额
      'pointsUse': data.order.points_use, // 使用积分数量
      'randomDeduction': data.order.random_deduction

    };
  }
  return formatResult(result);
};
// 取得当前用户及其可用优惠方案
let getInformation = async (data) => {
  let result = await apiGetInformation(data);
  if (result.success) {
    let data = result.data;
    result.data = {
      'isLogined': data.is_logined,
      'localUserId': data.user_id,
      'openId': data.openid,
      'credit': data.credit1,
      'creditToMoney': data.credit_to_money// 1积分=n元
    };
  }
  return formatResult(result);
};
// 预计算优惠券后应付
let getCouponDeduction = async (data) => {
  let result = await apigetCouponDeduction(data);
  if (result.success) {
    let data = result.data;
    result.data = {
      'couponDeduction': data.coupon_deduction,
      'remaining': data.remaining
    };
  }
  return formatResult(result);
};

const getWxpaySignature = data => {
  return formatResult(apiGetWxpaySignature(data));
};
const lockOrder = async (data) => {
  let result = await apiLockOrder(data);
  if (result.success) {
    let data = result.data;
    result.data = {
      'isNeedPay': data.need_pay,
      'isFree': data.free,
      'realReceive': data.real_receive,
      'randomDeduction': data.random_deduction
    };
  }
  return formatResult(result);
};

export {
  pendingOrder,
  getInformation,
  getCouponDeduction,
  getWxpaySignature,
  lockOrder
};
