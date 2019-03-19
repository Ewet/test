/**
 * 采集版记录更新
 */
import api from 'api';

export default params => api.post('/boxserver/box/acquisition_board/modify', params);
