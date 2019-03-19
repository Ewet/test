/**
 * 导出小伙伴
 */
import api from 'api';

export default params => api.download('/platform/member_center/distribution/trader/subordinate_export', params);
