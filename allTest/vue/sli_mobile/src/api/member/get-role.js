/**
 * 获取角色
 */
import api from '../api';
export default (params) => {
  return api.post('/boxserver/mobile/userRole/judge', params);
};
