/**
 * 部门单条记录查询
 */
import api from 'api';

export default params => api.post('/boxserver/box/goods_category/info', params);
