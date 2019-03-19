import api from 'api';

// 商户分成统计列表
export default params => api.get('/boxserver/box/merchant/distribution', params);
