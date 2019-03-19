// 订单详情
import api from 'api';

export default params => api.post('/boxserver/box/order/modify', params);
