/**
 * 代购员邀请奖励金查看
 */
import api from 'api';

export default params => api.post('/platform/activity/recommend/info', params);
