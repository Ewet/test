// 我的盒子-详情
import api from 'api/api';
export default (params) => {
  return api.post('/boxserver/mobile/mybox/goodsList', params);
};
