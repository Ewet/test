
// 盒子删除空调设置
import api from 'api';

export default params => api.post('/boxserver/box/realTimeStatus/deleteAirConditionerSetting', params);
