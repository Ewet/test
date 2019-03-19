/**
 * 订单纠正(暂停收/退款)
 */
import api from 'api';

export default params => api.post('/boxserver/box/new_refund_payment/enable', params);
