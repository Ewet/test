// 明细列表
import api from 'api';

export default params => api.post('/boxserver/invoice/detail/list', params);
