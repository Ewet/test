/**
 * 分销商管理编辑
 */
import api from 'api';

export default params => api.post('/platform/member_center/distribution/trader/modify', params);
