/**
 * 提交微信授权码
 */
import api from '../api';
export default (params) => {
  return api.post('/platform/mobile/wxo2code', params);
};
