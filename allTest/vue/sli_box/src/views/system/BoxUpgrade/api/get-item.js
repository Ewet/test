/**
 * 盒子升级记录查询
 */
import api from 'api';

export default params => api.post('/boxserver/box/upgrade/info', params);
