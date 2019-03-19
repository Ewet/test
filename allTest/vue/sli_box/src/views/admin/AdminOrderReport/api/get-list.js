/**
 * 订单报表-立即搜索_全局查询
 */
import api from 'api';

export default params => api.post('/boxserver/box/finance/list/orderReport_all', params);
