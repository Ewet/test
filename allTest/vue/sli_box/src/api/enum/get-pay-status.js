/**
 * 订单状态枚举
 */
import api from 'api';

export default params => api.post('/platform/common/dictionary/info', { param_key: 'plf_order_pay_status' });
