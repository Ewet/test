import api from 'api';

export default params => api.post('/boxserver/box/selling/plan/get_code_url', params);
