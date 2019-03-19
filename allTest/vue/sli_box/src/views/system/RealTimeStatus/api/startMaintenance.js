
// 开始维护
import api from 'api';

export default params => api.post('/boxserver/box/realTimeStatus/startMaintenance', params);
