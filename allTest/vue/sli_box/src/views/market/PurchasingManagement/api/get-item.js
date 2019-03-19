/**
 * 代购员管理
 */
import api from 'api';

export default params => api.post('/boxserver/box/purchasing/agent/info', params);
