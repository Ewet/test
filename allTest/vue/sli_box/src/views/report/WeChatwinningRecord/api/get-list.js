/**
 * 分销规则列表
 */
import api from 'api';

export default params => api.post('/platform/winningRecord/list', params);
