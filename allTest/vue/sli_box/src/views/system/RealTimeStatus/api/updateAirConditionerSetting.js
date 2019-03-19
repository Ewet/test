
// 盒子调整空调设置
import api from 'api';

export default params => api.post('/boxserver/box/realTimeStatus/updateAirConditionerSetting', params);
