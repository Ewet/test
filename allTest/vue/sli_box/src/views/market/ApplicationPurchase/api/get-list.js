import api from 'api';

export default params => api.post('/boxserver/box/purchasing_agent/apply/list', params);
