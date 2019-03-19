/**
 * 主控板记录删除
 */
import api from 'api';

export default params => api.post('/boxserver/box/control_board/delete', params);
