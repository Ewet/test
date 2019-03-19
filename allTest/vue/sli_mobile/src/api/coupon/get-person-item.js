/**
 * 优惠券详情信息(个人)
 */
import api from '../api';
export default (params) => {
  return api.post('/platform/mobile/user/coupon/info', params);
};
