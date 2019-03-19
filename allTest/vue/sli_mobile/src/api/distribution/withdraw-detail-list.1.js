// 提现明细列表
import api from '../api';
export default (params) => {
  return api.post('/platform/mobile/distribution/withdraw/list', params);
};
