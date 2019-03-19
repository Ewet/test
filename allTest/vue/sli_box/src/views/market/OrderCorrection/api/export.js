/**
 * 订单纠正列表导出
 */
import api from 'api';

export default params => api.download('/boxserver/box/refund_payment/export_detail', params);
