import api from 'api';

export default params => api.post('/boxserver/box/realTimeStatus/open_door', params);
