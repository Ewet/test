import api from '../api';
export default (params) => {
  return api.post('/boxserver/mobile/invoice/applyInvoice', params);
};
