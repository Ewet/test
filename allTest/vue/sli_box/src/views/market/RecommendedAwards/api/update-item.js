/**
 * 推荐有奖记录更新
 */
import api from 'api';

export default params => api.post('/platform/activity/recommend/modify', params);
