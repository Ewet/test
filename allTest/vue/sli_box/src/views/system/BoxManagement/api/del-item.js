/**
 * 盒子删除
 */
import api from 'api';

export default params => api.post('/boxserver/box/base/delete', params);
