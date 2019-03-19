/**
 * 代购员推荐活动-奖励记录/platform/activity/recommend/rewards_record
 */
import api from 'api';

export default params => api.post('/platform/award/award_record', params);
