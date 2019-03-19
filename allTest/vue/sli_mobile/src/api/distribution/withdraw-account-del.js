// 提现账户删除
import api from '../api';
export default (params) => {
  return api.post('/platform/mobile/distribution/withdraw/account/delete', params);
};
