/**
 * 导出分销商
 */
import api from 'api';

export default params => api.download('/platform/member_center/distribution/trader/export', params);
