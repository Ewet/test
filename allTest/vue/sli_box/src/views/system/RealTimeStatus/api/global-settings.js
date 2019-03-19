
// 盒子实时状态列表
import api from 'api';

export default params => api.post('/boxserver/box/realTimeStatus/globalSettings', params);
