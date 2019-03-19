/**
 * 领取优惠券
 */
import api from '../api';
export default (params) => {
  return api.post('/platform/mobile/user/coupon/receive', params);
};
