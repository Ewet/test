/**
 * 提现状态数量(列表)
 */
import api from 'api';

export default params => api.post('/platform/member_center/distribution/withdraw/getCount', params);