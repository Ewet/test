/**
 * 获取说明
 */
import api from 'api';

export default params => api.post('/platform/member_center/coupon/desc_info', params);
