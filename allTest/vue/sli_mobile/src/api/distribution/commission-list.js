// 奖励金记录列表
import api from '../api';
export default (params) => {
  return api.post('/platform/mobile/distribution/grant/list', params);
};
