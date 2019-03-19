/**
 * 分销规则
 */
import api from 'api';

export default params => api.post('/platform/member_center/goods/commission/rule/info', params);
