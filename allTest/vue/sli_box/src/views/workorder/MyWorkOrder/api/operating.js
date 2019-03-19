/**
 * 工单-处理
 */
import api from 'api';

export default params => api.post(`/boxserver/tickets/${params.ticket_id}/operating`, params);
