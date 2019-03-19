import api from 'api';

// 实时库存列表导出
export default params => api.download('/boxserver/box/inventory/report', params);
