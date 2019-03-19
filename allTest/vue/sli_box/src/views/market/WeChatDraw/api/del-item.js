/**
 * 推荐有奖-删除
 */
import api from 'api';

export default params => api.post('/platform/activity/draw/delete', params);
