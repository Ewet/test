// 提现账户保存
import api from '../api';
export default (params) => {
  return api.post('/platform/mobile/distribution/withdraw/account/save', params);
};
