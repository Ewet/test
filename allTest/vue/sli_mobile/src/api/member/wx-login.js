/**
 * 微信登陆
 */
import api from '../api';
export default (params) => {
  return api.post('/platform/mobile/wxlogin', params);
};
