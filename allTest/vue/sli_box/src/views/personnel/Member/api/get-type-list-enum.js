/**
 * 会员类型(列表)_enum
 */
import api from 'api';

export default params => api.post('/platform/member_center/user/member_type_list_enum', params);
