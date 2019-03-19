// 我的配额
import api from '../api';
export default (params) => {
  return api.post('/platform/mobile/distribution/quota', params);
};
