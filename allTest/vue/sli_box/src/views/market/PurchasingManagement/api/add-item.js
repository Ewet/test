/**
 * 代购员管理新增
 */
import api from 'api';

export default params => api.post('/boxserver/box/purchasing/agent/create', params);
