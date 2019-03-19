// 奖励金列表
import api from '../api';
export default (params) => {
  return api.post('/platform/mobile/distribution/commission/list', params);
};
