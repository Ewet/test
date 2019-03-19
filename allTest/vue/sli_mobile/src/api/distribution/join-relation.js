// 加入上线
import api from '../api';
export default (params) => {
  return api.post('/platform/mobile/distribution/relation/join', params);
};
