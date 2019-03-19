import api from 'api';

export default params => api.post('/boxserver/box/inventory/replenishment/info', params);
