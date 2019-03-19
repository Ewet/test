import api from 'api';

export default params => api.post('/boxserver/merchant/operator_merchant/sign_in_info', params);
