// 我的盒子-列表
import api from 'api/api';
export default (params) => {
  return api.get('/boxserver/mobile/orders/agent/is', params);
};
