/**
 * 订单报表-导出报表
 */
import api from 'api';

export default params => api.download('/boxserver/box/finance/list/report', params);
