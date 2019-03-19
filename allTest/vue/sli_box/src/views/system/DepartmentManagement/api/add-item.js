/**
 * 部门记录新增
 */
import api from 'api';

export default params => api.post('/boxserver/auth/department/create', params);
