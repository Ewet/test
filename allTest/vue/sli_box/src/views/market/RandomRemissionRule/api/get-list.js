/**
 * 随机立减活动列表
 */
import api from 'api';

export default params => api.post('/platform/member_center/random_remission/list', params);
