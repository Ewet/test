/**
 * 盒子升级-固件类型列表
 */
import api from 'api';

export default params => api.post('/boxserver/box/firmware/firmwares_type_list', params);
