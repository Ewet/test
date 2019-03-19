// 我的盒子-列表
import api from 'api/api';
export default (params) => {
  return api.post('/boxserver/mobile/mybox/list', params);
};
