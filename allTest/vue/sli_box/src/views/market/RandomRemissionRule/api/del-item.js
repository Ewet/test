/**
 * 随机立减活动删除
 */
import api from 'api';

export default params => api.post('/platform/member_center/random_remission/delete', params);
