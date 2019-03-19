/**
 * 优惠券发放记录列表
 */
import api from 'api';

export default params => api.post('/platform/member_center/coupon/user_coupon_list', params);
