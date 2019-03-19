import api from 'api';

export default params => api.post('/boxserver/box/finance/report/saleDetails_all', params);
