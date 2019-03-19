/**
 * 优惠券详情信息(公共)
 */
import api from '../api';
export default (params) => {
  return api.post('/platform/mobile/coupon/template_info', params);
};
