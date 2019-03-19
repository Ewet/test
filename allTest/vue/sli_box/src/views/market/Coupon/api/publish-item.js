/**
 * 发行
 */
import api from 'api';

export default params => api.post('/platform/member_center/coupon/change_publish_status', params);
