// 补货盒子列表  /platform/mobile/replenishment/getBoxList
import api from '../api';
export default (params) => {
  return api.post('/boxserver/mobile/box/replenishment/list', params);
};
