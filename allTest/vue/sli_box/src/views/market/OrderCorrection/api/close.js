/**
 * 订单纠正关闭(暂停收/退款)
 */
import api from 'api';

export default params => api.post('/boxserver/box/refund_payment/close', params);
