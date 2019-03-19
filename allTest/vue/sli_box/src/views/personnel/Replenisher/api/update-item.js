/**
 * 补货员记录更新
 */
import api from 'api';

export default params => api.post('/boxserver/box/replenishman/modify', params);
