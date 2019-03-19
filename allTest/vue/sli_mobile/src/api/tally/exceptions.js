// 理货-异常提交
import api from '../api';
export default (params) => {
  return api.post('/boxserver/mobile/replenishment/collate/exceptions', params);
};
