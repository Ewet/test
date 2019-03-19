/**
 * 提现审批
 */
import api from 'api';

export default params => api.post('/platform/member_center/distribution/withdraw/audit', params);
