/**
 * 盒子升级-批量升级
 */
import api from 'api';

export default params => api.post('/boxserver/box/upgrade/batch_upgrade', params);
