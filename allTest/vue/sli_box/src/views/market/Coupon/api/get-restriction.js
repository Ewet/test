/**
 * 获取限制
 */
import api from 'api';

export default params => api.post('/platform/member_center/coupon/use_info', params);
