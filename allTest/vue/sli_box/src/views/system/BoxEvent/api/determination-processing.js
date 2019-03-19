import api from 'api';

export default params => api.post('/boxserver/box/box_event/handle', params);
