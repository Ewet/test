/**
 * 角色单条记录查询
 */
import api from 'api';

export default params => api.post('/boxserver/box/replenishman/info', params);
