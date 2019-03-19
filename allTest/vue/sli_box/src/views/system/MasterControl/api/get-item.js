/**
 * 主控板单条记录查询
 */
import api from 'api';

export default params => api.post('/boxserver/box/control_board/info', params);
