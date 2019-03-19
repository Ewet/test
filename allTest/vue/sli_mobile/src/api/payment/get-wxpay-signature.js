import api from '../api';
export default (params) => {
  return api.post('/platform/mobile/payment/wxpay_signature', params);
};
