/**
 * 部门列表查询
 */
import api from 'api';

export default params => api.post('/boxserver/auth/department/list', params);
