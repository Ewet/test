/**
 * 分销订单列表
 */
import api from 'api';

export default params => api.post('/platform/member_center/distribution/order/list', params);
