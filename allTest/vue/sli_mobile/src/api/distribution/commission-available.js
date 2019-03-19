// 奖励金可提取
import api from '../api';
export default (params) => {
  return api.post('/platform/mobile/distribution/commission/available', params);
};
