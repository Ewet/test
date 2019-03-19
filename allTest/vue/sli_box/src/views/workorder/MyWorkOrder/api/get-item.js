/**
 * 工单-详情
 */
import api from 'api';

export default params => api.get(`/boxserver/tickets/${params}`, params);
