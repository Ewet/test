/**
 * 订单详情
 */
import api from 'api';

export default params => api.post('/platform/member_center/distribution/order/info', params);