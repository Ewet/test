import api from 'api';

export default params => api.post('/boxserver/box/finance/sum/totalmoney', params);
