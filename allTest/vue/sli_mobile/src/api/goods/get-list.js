/**
 * 获取订单包含的商品
 */
import api from '../api';
export default (params) => {
  return api.get(`/boxserver/mobile/goods/order/${params.sn}`, params);
};
