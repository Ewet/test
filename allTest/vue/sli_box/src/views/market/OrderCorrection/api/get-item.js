/**
 * 订单纠正列表详情
 */
import api from 'api';

export default params => api.post('/boxserver/box/refund_payment/details', params);
