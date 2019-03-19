/**
 * 说明保存
 */
import api from 'api';

export default params => api.post('/platform/member_center/coupon/desc_modify', params);
