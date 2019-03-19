// 明细列表
import api from 'api';

export default params => api.download('/boxserver/invoice/detail/export_detail', params);
