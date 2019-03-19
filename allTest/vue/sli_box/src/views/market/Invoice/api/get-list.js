import api from 'api';

export default params => api.post('/boxserver/invoice/list', params);
