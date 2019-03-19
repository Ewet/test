/**
 * 分销规则删除
 */
import api from 'api';

export default params => api.post('/platform/member_center/distribution/rule/delete', params);
