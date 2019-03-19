// 提现帐号类型
import api from '../api';
export default (params) => {
  return api.post('/platform/mobile/distribution/withdraw/account/type/list', params);
};
