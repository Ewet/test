import api from 'api/api';
export default (params) => {
  return api.post('/platform/mobile/prizesList/list', params);
};
