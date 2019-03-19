/**
 * 订单报表列表
 */
import api from 'api';

export default params => api.post('/boxserver/box/finance/list/orderReport', params);
