/**
 * 主控板列表查询
 */
import api from 'api';

export default params => api.post('/boxserver/box/control_board/list', params);
