
/**
 * 保存赠券活动信息
 */
import api from 'api';

export default params => api.post('/platform/member_center/coupon/scheme/modify', params);
