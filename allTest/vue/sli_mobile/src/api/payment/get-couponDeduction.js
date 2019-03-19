import api from '../api';
export default (params) => {
  return api.post('/platform/mobile/payment/calculate_coupon_deduction', params);
};
