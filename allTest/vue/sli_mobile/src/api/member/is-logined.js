import api from '../api';
export default (params) => {
  return api.get('/boxserver/mobile/user/is_login', params);
};
