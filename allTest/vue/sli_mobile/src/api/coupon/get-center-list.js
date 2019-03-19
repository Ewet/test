/**
 * 领券中心优惠券列表
 */
import api from '../api';
export default (params) => {
  return api.post('/platform/mobile/coupon/center_list', params);
};
