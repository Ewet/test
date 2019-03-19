/**
 * 分销规则
 */
import api from 'api';

export default params => api.get(`/boxserver/box/merchant/${params.merchant_id}/distribution/rule/${params.rule_id}`, params);
