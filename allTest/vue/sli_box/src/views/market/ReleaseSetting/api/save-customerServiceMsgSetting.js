/**
 * 保存客服消息设置
 */
import api from 'api';

export default params => api.post('/platform/member_center/coupon/grant_csm_setting', params);
