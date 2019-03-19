/**
 * 获取商品详情
 */
import api from '../api';
export default (params) => {
  return api.get(`/boxserver/mobile/goods/${params.id}`, params);
};
