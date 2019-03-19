/**
 * 推荐有奖单条记录查询
 */
import api from 'api';

export default params => api.post('/platform/activity/activity_detail', params);
