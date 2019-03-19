/**
 * 发送优惠劵消息
 */
import api from 'api';

export default params => api.post('/platform/member_center/coupon/grant', params);
