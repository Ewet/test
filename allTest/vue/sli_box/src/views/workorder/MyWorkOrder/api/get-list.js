/**
 * 消息通知中心列表
 */
import api from 'api';

export default params => api.get('/boxserver/tickets', params);
