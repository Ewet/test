/**
 * 部门记录更新
 */
import api from 'api';

export default params => api.post('/boxserver/auth/department/update', params);
