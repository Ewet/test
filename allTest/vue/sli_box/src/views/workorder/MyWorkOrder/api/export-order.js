/**
 * 消息通知中心列表
 */
import api from 'api';

export default params => api.download('/boxserver/tickets/export', params);
