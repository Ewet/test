/**
 * 订单报表-导出报表_全局查询
 */
import api from 'api';

export default params => api.download('/boxserver/box/finance/list/report_all', params);
