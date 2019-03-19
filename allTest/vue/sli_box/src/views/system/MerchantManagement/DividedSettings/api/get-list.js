/**
 * 分销规则列表
 */
import api from 'api';

export default params => api.get(`/boxserver/box/merchant/${params.merchant_id}/distribution/rule`, params);
