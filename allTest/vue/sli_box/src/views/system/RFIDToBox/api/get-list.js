/**
 * RFID关联盒子列表查询
 */
import api from 'api';

export default params => api.post('/boxserver/box/rfid/inventory', params);
