//
import api from 'api';

export default params => api.download('/boxserver/box/export_all', params);
