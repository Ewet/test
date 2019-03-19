/**
 * 查询一条随机立减活动
 */
import api from 'api';

export default params => api.post('/platform/member_center/random_remission/info', params);
