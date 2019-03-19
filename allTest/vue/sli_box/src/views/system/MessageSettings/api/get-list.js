/**
 * 消息设置（推送设置）列表
 */
import api from 'api';

export default params => api.post('/boxserver/box/notification/push_setting_list', params);
