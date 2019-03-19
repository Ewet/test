import api from '../api';
export default (params) => {
  return api.post('/boxserver/mobile/box/order/list', params);
};
