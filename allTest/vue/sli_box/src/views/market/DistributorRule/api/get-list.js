/**
 * 分销规则列表
 */
import api from 'api';

export default params => api.post('/platform/member_center/distribution/rule/list', params);
