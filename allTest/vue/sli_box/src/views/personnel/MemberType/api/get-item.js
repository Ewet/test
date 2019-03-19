/**
 * 获取一条会员类型记录
 */
import api from 'api';

export default params => api.post('/platform/member_center/user/member_type_info', params);
