/**
 * 重新退款
 */
import api from 'api';

export default params => api.post('/boxserver/box/new_refund_payment/refund/retry', params);
