import api from 'api';

export default params => api.post('/boxserver/box/operators/delete', params);