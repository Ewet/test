/**
 * 获取模版消息列表
 */
import api from 'api';

export default params => api.post('/platform/member_center/weixin/message_template/cfg_list', params);
