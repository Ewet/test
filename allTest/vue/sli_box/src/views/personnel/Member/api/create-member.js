/**
 * 会员资格(新增)
 */
import api from 'api';

export default params => api.post('/platform/member_center/user/create_member', params);
