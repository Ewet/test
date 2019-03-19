/**
 * 分销佣金提现(列表)
 */
import api from 'api';

export default params => api.post('/platform/member_center/distribution/withdraw/list', params);
