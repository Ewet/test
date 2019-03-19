/**
 * 订单纠正关闭按钮
 */
import api from 'api';

export default params => api.post('/boxserver/box/new_refund_payment/order/close', params);
