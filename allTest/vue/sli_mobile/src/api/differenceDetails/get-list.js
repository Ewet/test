// 退收款详情
import api from '../api';
export default (params) => {
  return api.post('/boxserver/mobile/refund_payment/details', params);
};
