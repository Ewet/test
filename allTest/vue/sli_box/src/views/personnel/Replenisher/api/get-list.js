/**
 * 补货员-列表
 */
import api from 'api';

export default params => api.post('/boxserver/box/replenishman/list', params);
