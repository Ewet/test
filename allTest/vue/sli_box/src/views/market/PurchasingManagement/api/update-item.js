/**
 * 代购员管理更新
 */
import api from 'api';

export default params => api.post('/boxserver/box/purchasing/agent/modify', params);
