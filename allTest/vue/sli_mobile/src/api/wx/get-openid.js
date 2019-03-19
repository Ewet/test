/**
 * 获取微信用户的OpenID
 */
import api from '../api';
export default (params) => {
  return api.post('/platform/mobile/weixin/openid', params);
};
