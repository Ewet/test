/**
 * 奖品优惠券列表
 */
import api from 'api';

export default params => api.post('/platform/activity/prize/coupon_list', params);
