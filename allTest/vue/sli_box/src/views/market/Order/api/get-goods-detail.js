// 订单商品详情
import api from 'api';

export default params => api.post('/platform/member_center/order/goods/info', params);
