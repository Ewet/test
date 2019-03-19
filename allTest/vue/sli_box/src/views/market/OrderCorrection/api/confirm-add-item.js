/**
 * 订单纠正列表
 */
import api from 'api';

export default params => api.post('/boxserver/box/new_refund_payment/create',
  params,
  {
    headers: {
      'Content-Type': 'application/json;charset=UTF-8'
    }
  });
