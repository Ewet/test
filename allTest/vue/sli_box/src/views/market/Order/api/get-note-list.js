// 获取备注列表
import api from 'api';

export default params => api.post('/boxserver/box/order/note/list', params);
