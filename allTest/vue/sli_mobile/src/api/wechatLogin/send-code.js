/**
 * 发送验证码
 */
import api from '../api';
export default (params) => {
  return api.post('/platform/mobile/register', params);
};
