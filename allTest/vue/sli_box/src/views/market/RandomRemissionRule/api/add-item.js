/**
 * 随机立减活动新增
 */
import api from 'api';

export default params => api.post('/platform/member_center/random_remission/create', params);
