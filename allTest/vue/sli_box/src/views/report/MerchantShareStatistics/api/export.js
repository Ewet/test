import api from 'api';

// 商户分成统计导出
export default params => api.download('/boxserver/box/merchant/distribution/export', params);
