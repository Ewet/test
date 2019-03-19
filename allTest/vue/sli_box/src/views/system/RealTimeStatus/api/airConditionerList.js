
// 盒子空调状态列表
import api from 'api';

export default params => api.post('/boxserver/box/realTimeStatus/airConditionerList', params);
