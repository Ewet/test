// 积分列表
import api from '../api';
export default (params) => {
  return api.post('/platform/mobile/distribution/credit/list', params);
};
