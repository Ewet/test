/**
 * 留言列表
 */
import api from 'api';

export default params => api.post('/platform/website/message/list', params);
