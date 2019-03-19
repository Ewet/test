/**
 *
 */
import api from 'api';

export default params => api.put(`/boxserver/box/merchant/${params.merchant_id}/distribution/rule/${params.rule_id}/start`, params, { dataType: 'json' });
