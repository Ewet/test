/**
 * 本地环境伪造登陆
 */
import api from '../api';
export default (params) => {
  return api.post('/platform/mobile/forgery_login', params);
};
