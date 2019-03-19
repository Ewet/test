/**
 * 订单纠正开启(暂停收/退款)
 */
import api from 'api';

export default params => api.post('/boxserver/box/refund_payment/open', params);
