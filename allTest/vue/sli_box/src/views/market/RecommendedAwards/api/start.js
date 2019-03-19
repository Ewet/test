/**
 * 推荐活动开始
 */
import api from 'api';

export default params => api.post('/platform/registration/activities/start', params);
