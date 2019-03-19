/**
 * 分销商管理删除
 */
import api from 'api';

export default params => api.post('/platform/member_center/distribution/trader/delete', params);
