/**
 * 分销规则删除
 */
import api from 'api';

export default params => api.del(`/boxserver/box/merchant/${params.merchant_id}/distribution/rule/${params.rule_id}`, params);
