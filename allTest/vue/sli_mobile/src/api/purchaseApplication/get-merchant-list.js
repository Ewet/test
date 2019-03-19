/**
 * 提交代购申请
 */
import api from '../api';
export default (params) => {
  return api.post('/boxserver/mobile/merchant/list', params);
};
