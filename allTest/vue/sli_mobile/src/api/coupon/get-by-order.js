/**
 * 由订单匹配拥有的优惠券信息
 */
import api from '../api';
export default (params) => {
  return api.post('/platform/mobile/user/coupon/order_match', params);
};
