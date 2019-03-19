/**
 * 分成规择操作记录列表
 */
import api from 'api';

export default params => api.get(`/boxserver/box/merchant/${params.merchant_id}/distribution/rule/${params.rule_id}/operation`, params);
