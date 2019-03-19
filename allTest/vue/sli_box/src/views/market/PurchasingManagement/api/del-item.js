/**
 * 代购员管理删除
 */
import api from 'api';

export default params => api.post('/boxserver/box/purchasing/agent/delete', params);
