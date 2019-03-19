
// 发送订单催款通知
import api from 'api';

export default params => api.post('/boxserver/box/order/notify', params);
