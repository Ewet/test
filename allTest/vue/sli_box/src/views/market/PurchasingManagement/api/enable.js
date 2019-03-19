/**
 * 代购员管理-启用
 */
import api from 'api';

export default params => api.post('/boxserver/box/purchasing/agent/enable', params);
