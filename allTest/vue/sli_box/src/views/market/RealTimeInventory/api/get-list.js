import api from 'api';

// 实时库存列表
export default params => api.get('/boxserver/box/inventory/list', params);
