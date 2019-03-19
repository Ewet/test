/**
 * 注册手机号码
 */
import api from '../api';
export default (params) => {
  return api.post('/platform/mobile/register/verify', params);
};
