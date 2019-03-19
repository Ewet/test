/**
 * 微信JS SDK 获取签名
 */
import api from '../api';
export default (params) => {
  return api.post('/platform/common/wxjssdk/getSignature', params);
};
