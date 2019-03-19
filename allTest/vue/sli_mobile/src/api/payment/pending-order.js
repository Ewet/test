import api from '../api';
export default (params) => {
  return api.post('/platform/mobile/payment/pending_payment_order_info', params);
};
