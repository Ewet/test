// 理货-货区列表
import api from '../api';
export default (params) => {
  return api.get('/boxserver/mobile/replenishment/organize/list', params);
};
