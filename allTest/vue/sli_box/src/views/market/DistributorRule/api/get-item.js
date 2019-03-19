/**
 * 查询一条分销商
 */
import api from 'api';

export default params => api.post('/platform/member_center/distribution/rule/info', params);
