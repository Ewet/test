import api from '../api';
export default (params) => {
  return api.post('/platform/common/dictionary/info', params);
};
