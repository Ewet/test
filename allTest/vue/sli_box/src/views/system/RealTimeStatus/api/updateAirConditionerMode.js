
// 盒子空调模式设置
import api from 'api';

export default params => api.post('/boxserver/box/realTimeStatus/updateAirConditionerMode', params);
