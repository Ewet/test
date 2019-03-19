/**
 * 代购员推荐活动-奖励记录-导出表格
 */
import api from 'api';

export default params => api.download('/platform/award/get_excel', params);
