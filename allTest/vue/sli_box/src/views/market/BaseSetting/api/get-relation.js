/**
 * 获取上下级关系
 */
import api from 'api';

export default params => api.post('/platform/member_center/distribution/config/relation/info', params);
