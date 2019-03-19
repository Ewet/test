
// 盒子查看空调时段
import api from 'api';

export default params => api.post('/boxserver/box/realTimeStatus/getAirConditionerSetting', params);
