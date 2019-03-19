/**
 * 推荐活动结束
 */
import api from 'api';

export default params => api.post('/platform/registration/activities/stop', params);
