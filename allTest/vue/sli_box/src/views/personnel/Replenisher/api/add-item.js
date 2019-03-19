/**
 * 补货员-新增
 */
import api from 'api';

export default params => api.post('/boxserver/box/replenishman/create', params);
