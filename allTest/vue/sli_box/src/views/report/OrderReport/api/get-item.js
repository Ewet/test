/**
 * 订单报表-订单详情
 */
import api from 'api';

export default params => api.post('/boxserver/box/finance/list/orderDetail', params);
