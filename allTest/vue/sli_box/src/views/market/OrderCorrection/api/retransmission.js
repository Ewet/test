/**  /boxserver/box/refund_payment/retransmission
 * 订单纠正重发  /boxserver/box/new_refund_payment/receipt/{correction_order_id}/retry
 */
import api from 'api';

export default params => api.post('/boxserver/box/new_refund_payment/receipt/retry', params);
