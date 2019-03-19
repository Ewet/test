/**
 * 分销规则
 */
import api from 'api';

export default params => api.post('/platform/activity/prize/info', params);
