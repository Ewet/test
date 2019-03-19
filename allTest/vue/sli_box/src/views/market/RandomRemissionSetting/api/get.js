/**
 * 随机立减活动设置获取
 */
import api from 'api';

export default params => api.post('/platform/member_center/random_remission_cfg/info', params);
