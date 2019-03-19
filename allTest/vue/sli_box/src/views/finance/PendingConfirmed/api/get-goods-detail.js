// 订单商品详情
import api from 'api';

export default params => api.post('/boxserver/box/refund/goods/info', params);
