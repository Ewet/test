/**
 * 赠券活动列表
 */
import api from 'api';

export default params => api.post('/platform/member_center/coupon/scheme/list', params);
