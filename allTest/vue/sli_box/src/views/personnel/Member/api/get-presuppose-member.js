/**
 * 预设会员列表
 */
import api from 'api';

export default params => api.post('/platform/member_center/user/presuppose_member', params);
