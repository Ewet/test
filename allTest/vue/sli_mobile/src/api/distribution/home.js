// 我的主页
import api from '../api';
export default (params) => {
  return api.post('/platform/mobile/distribution/mypage', params);
};
