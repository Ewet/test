/**
 * 使用限制保存
 */
import api from 'api';

export default params => api.post('/platform/member_center/coupon/use_modify', params);
