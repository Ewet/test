/**
 * 分销规则新增
 */
import api from 'api';

export default params => api.post('/platform/member_center/limit/rule/enable', params);
