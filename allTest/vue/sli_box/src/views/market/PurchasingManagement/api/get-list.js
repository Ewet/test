/**
 * 代购员管理列表
 */
import api from 'api';

export default params => api.post('/boxserver/box/purchasing/agent/management', params);
