/**
 * 分销商关系列表
 */
import api from 'api';

export default params => api.post('/platform/member_center/distribution/relation/list', params);
