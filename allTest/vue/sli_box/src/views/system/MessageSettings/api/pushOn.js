/**
 * 开启推送
 */
import api from 'api';

export default params => api.post('/boxserver/box/notification/push_setting_open', params);
