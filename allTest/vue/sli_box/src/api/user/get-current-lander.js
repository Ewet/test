import api from 'api';

export default params => api.post('/boxserver/box/user/current_lander', params);
