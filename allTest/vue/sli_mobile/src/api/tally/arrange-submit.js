// 理货完毕
import api from '../api';
export default (params) => {
  return api.post('/boxserver/mobile/replenishment/arrange_submit', params);
};
