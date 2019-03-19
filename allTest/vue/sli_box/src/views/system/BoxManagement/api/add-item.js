/**
 * 盒子新增
 */
import api from 'api';

export default params => api.post('/boxserver/box/base/create', params);
