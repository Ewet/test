/**
 * 获取领取设置
 */
import api from 'api';

export default params => api.post('/platform/member_center/coupon/receive_info', params);
