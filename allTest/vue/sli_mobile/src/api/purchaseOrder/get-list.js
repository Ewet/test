import api from '../api';
export default (params) => {
  return api.get('/boxserver/mobile/orders/agent', params);
};