/**
 * 工单-沟通详情
 */
import api from 'api';

export default params => api.get(`/boxserver/tickets/${params}/record`, params);
