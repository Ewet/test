/**
 * 获取权限配置的树
 */
import api from 'api';

export default params => api.post('/boxserver/auth/resources/list', params);
