/**
 * 订单纠正列表
 */
import api from 'api';

export default params => api.post('/boxserver/box/refund_payment/list', params);
