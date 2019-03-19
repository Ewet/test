// 奖励金提现
import api from '../api';
export default (params) => {
  return api.post('/platform/mobile/distribution/withdraw', params);
};
