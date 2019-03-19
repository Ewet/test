/**
 * 盒子升级列表查询
 */
import api from 'api';

export default params => api.post('/boxserver/box/upgrade/list', params);
