/**
 * 推荐有奖-列表
 */
import api from 'api';

export default params => api.post('/platform/activity/draw/list', params);
