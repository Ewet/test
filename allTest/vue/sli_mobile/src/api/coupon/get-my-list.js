/**
 * 我的优惠券列表
 */
import api from '../api';
export default (params) => {
  return api.post('/platform/mobile/user/coupon/list', params);
};
