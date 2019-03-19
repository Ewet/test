/**
 * 分销规则新增
 */
import api from 'api';

export default params => api.post(`/boxserver/box/merchant/${params.merchant_id}/distribution/rule`, params);
