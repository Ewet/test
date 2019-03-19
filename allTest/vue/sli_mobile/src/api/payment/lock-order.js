import api from '../api';
export default (params) => {
  return api.post('/platform/mobile/payment/lock_the_order_for_pay', params);
};
