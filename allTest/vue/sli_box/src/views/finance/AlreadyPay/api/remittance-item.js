/**
 * 打款
 */
import api from 'api';

export default params => api.post('/platform/member_center/distribution/withdraw/remittance', params);
