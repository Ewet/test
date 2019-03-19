/**
 * 推荐有奖-新增
 */
import api from 'api';

export default params => api.post('/platform/activity/recommend/create', params);
