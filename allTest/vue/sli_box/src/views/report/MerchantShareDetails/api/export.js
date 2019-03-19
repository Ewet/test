import api from 'api';

// 商户分成详情导出
export default params => api.download(`/boxserver/box/merchant/${params.merchant_id}/distribution/${params.rule_id}/export`, params);
