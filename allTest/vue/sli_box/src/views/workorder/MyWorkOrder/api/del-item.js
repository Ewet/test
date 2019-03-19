/**
 * 工单-删除
 */
import api from 'api';

export default params => api.del(`/boxserver/tickets/${params.ticket_id}`, params);
