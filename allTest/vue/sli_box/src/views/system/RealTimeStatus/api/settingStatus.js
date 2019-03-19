
// 盒子空调激活状态
import api from 'api';

export default params => api.post('/boxserver/box/realTimeStatus/settingStatus', params);
