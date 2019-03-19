// 提取现金
import api from '../api';
export default (params) => {
  return api.post('/platform/mobile/distribution/withdraw/apply', params);
};
