/**
 * 随机立减活动更新
 */
import api from 'api';

export default params => api.post('/platform/member_center/random_remission/modify', params);
