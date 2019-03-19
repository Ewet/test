import api from 'api';

export default params => api.post('/boxserver/auth/auth_oplog/list', params);
