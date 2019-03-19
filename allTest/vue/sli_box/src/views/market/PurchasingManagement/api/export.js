import api from 'api';

export default params => api.download('/boxserver/box/purchasing/agent/export_management', params);
