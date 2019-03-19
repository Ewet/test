import api from 'api';

export default params => api.download('/boxserver/box/customer/export', params);
