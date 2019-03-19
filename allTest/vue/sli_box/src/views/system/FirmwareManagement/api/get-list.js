import api from 'api';

export default params => api.post('/boxserver/box/firmware/list', params);
