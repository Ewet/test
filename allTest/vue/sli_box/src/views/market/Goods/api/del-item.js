/**
 * 角色记录删除
 */
import api from 'api';

export default params => api.post('/boxserver/box/goods/delete', params);
