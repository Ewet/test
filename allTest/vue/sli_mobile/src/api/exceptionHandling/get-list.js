
import api from '../api';
export default (params) => {
  return api.post('/boxserver/mobile/replenishment/exception_list', params);
};
