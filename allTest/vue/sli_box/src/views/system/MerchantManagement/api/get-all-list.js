import api from 'api';

export default params => api.post('/boxserver/box/merchant/all_list', params);