
// 盒子灯光模式查看
import api from 'api';

export default params => api.post('/boxserver/box/realTimeStatus/lightMode', params);
