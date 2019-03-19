
// 订单详情
import api from '../api';
export default (params) => {
  return api.post('/boxserver/mobile/box/order/sn_info', params);
};
