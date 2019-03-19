
// 盒子新增空调时段
import api from 'api';

export default params => api.post('/boxserver/box/realTimeStatus/creatAirConditionerSetting', params);
