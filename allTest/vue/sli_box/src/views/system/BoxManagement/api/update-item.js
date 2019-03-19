/**
 * 盒子更新
 */
import api from 'api';

export default params => api.post('/boxserver/box/base/modify', params);
