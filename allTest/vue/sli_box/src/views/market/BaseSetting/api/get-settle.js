/**
 * 获取结算
 */
import api from 'api';

export default params => api.post('/platform/member_center/distribution/config/settle/info', params);
