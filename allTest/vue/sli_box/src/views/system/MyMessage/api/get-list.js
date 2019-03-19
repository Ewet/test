/**
 * 消息通知中心列表
 */
import api from 'api';

export default params => api.post('/boxserver/box/notification/my_message', params);
