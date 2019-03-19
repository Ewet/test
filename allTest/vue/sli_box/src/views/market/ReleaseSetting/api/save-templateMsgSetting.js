/**
 * 保存模版消息设置
 */
import api from 'api';

export default params => api.post('/platform/member_center/coupon/grant_wxtm_setting', params);
