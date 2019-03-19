/**
 * 会员类型列表
 */
import api from 'api';

export default params => api.post('/platform/member_center/user/member_type_list', params);
