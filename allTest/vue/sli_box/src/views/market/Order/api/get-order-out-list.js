import api from 'api';

export default params => api.download('/boxserver/box/order/export_order_out_list', params);
