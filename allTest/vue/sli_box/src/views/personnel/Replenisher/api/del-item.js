/**
 * 补货员-删除
 */
import api from 'api';

export default params => api.post('/boxserver/box/replenishman/delete', params);
