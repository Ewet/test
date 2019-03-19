/**
 * 盒子记录查询
 */
import api from 'api';

export default params => api.post('/boxserver/box/base/info', params);
