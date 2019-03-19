/**
 * 工单-编辑
 */
import api from 'api';

export default params => api.put(`/boxserver/tickets/${params.ticket_id}`,
  params,
  {
    dataType: 'json'
  });
