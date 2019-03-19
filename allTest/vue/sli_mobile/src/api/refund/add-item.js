
import api from '../api';
export default (params) => {
  return api.post('/boxserver/mobile/box/refund/create', params);
};
