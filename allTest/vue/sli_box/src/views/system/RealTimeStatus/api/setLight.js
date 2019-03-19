
// 盒子灯光设置
import api from 'api';

export default params => api.post('/boxserver/box/realTimeStatus/setLight', params);
