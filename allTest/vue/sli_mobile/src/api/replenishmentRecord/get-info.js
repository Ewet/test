// 补货记录-详情
import api from '../api';
export default (params) => {
  return api.post('/boxserver/mobile/box/replenishment/info', params);
};
