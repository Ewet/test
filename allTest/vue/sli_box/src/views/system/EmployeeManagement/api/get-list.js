import api from 'api';

export default params => api.post('/boxserver/auth/employee/list', params);