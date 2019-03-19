import api from '../api';
export default (params) => {
  return api.post('/platform/mobile/logout', params);
};
