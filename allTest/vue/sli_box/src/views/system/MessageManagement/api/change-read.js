/**
 * 改变已读状态
 */
import api from 'api';

export default params => api.post('/platform/website/message/read', params);
