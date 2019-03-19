import api from 'api';

export default params => api.download('/boxserver/box/purchasing_agent/audit/report', params);
