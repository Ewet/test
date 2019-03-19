import api from 'api';

export default params => api.download('/boxserver/box/commission/export/order', params);
