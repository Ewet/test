/**
 * 盒子升级-固件信息列表
 */
import api from 'api';

export default params => api.post('/boxserver/box/firmware/info_list', params);
