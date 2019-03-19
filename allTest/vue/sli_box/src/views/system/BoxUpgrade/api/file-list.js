/**
 * 盒子升级-固件文件列表
 */
import api from 'api';

export default params => api.post('/boxserver/box/firmware/file_list', params);
