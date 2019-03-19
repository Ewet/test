/**
 * 主控板记录更新
 */
import api from 'api';

export default params => api.post('/boxserver/box/control_board/modify', params);
