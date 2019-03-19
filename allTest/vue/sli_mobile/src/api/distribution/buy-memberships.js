import api from '../api';
export default (params) => {
  return api.post('/platform/mobile/distribution/buy_memberships', params);
};
