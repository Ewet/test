// 我要理货
import api from '../api';
export default (params) => {
  return api.post('/boxserver/mobile/replenishment/collate', params);
};
