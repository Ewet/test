/**
 * 获取状态
 */
import api from '../api';
export default (params) => {
  return api.post('/boxserver/mobile/purchasing/check', params);
};
