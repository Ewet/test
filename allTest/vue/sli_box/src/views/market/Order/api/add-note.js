// 新增备注
import api from 'api';

export default params => api.post('/boxserver/box/order/note/create', params);
