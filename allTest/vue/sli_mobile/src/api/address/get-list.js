import api from '../api';
export default (params) => {
  return api.get('/address', params);
};
