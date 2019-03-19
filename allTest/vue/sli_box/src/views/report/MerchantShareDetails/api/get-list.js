import api from 'api';

// 商户分成详情列表
export default params => api.get(`/boxserver/box/merchant/${params.merchant_id}/distribution/${params.rule_id}`, params);
