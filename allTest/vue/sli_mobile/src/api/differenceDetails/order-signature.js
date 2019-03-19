// 获取进行订单纠正的订单的微信支付签名
import api from '../api';
export default (params) => {
  return api.post('/boxserver/mobile/orders/correction/pay', params);
};
