import api from '../api';
export default (params) => {
  return api.post('/platform/mobile/winner/modify', params);
};
