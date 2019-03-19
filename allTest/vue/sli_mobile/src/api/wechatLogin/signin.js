/**
 * 微信登录
 */
import api from '../api';
export default (params) => {
  return api.post('/platform/mobile/weixin/login', params);
};
