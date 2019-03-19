/**
 * 主控板记录新增
 */
import api from 'api';

export default params => api.post('/boxserver/box/control_board/create', params);
