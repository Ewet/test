/**
 * 查询
 */
import api from 'api';

export default params => api.post('/boxserver/box/goods_area/info', params);