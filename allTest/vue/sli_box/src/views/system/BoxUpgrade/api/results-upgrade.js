/**
 * 盒子升级-搜索结果列表
 */
import api from 'api';

export default params => api.post('/boxserver/box/upgrade/result_upgrade', params);
