/**
 * 登陆
 */
import api from '../api';
export default (params) => {
  return api.post('/platform/member_center/login', params);
};
