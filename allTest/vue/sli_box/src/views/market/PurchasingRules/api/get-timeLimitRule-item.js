/**
 * 分销规则
 */
import api from 'api';

export default params => api.post('/platform/member_center/limit/rule/info', params);
