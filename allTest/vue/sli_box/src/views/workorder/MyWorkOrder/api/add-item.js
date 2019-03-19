/**
 * 工单-新增
 */
import api from 'api';

export default params => api.post('/boxserver/tickets', params);
