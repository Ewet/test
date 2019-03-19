import api from 'api';

export default params => api.post('/boxserver/box/inventory/replenishment/exception_list', params);
