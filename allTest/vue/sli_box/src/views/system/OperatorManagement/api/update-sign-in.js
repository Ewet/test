import api from 'api';

export default params => api.post('/boxserver/box/operators/is_admin', params);
