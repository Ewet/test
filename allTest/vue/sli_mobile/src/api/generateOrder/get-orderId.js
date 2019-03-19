// 生成订单-普通会员提交订单
import api from 'api/api';
export default (params) => {
  return api.post('/boxserver/mobile/orders/normal', params);
};
