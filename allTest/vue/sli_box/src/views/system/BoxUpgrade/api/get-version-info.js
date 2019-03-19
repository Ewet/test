/**
 * 盒子升级-查询盒子版本信息
 */
import api from 'api';

export default params => api.post('/boxserver/box/upgrade/version_info', params);
