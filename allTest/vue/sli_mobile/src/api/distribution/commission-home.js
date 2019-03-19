// 奖励金首页
import api from '../api';
export default (params) => {
  return api.post('/platform/mobile/distribution/commission/catalog', params);
};
