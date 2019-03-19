/**
 * 角色记录更新
 */
import api from 'api';

export default params => api.post('/boxserver/auth/role/modify', params);
