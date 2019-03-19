// 提现账户列表
import api from '../api';
export default (params) => {
  return api.post('/platform/mobile/distribution/withdraw/account/list', params);
};
