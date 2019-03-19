/**
 * 分销规则删除
 */
import api from 'api';

export default params => api.post('/platform/activity/prize/delete', params);
