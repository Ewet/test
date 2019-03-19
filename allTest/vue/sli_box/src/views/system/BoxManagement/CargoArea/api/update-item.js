/**
 * 角色记录更新
 */
import api from 'api';

export default params => api.post('/boxserver/box/goods_area/modify', params);
