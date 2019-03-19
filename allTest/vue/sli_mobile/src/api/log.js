// 日志记录
import api from './api';
export default (params) => {
  return api.post('/platform/common/front/logging', params);
};
