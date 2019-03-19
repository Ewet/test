import api from 'api';

export default params => api.download('/boxserver/box/report/sale/export_detail', params);
