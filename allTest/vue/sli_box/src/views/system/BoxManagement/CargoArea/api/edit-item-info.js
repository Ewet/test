/**
 *盒子通道列表（编辑货区）
 */
import api from 'api';

export default params => api.post('/boxserver/box/goods_area/getChannelDetailByGarea', params);
