/**
 * 分销规则更新
 */
import api from 'api';

export default params => api.post('/platform/member_center/goods/commission/rule/modify', params);