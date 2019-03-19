/**
 * 分销商管理列表
 */
import api from 'api';

export default params => api.post('/platform/member_center/distribution/trader/list', params);
