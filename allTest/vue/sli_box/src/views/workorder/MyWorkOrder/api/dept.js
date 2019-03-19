/**
 * 部门人员信息
 */
import api from 'api';

export default params => api.get('/boxserver/tickets/dept', params);
