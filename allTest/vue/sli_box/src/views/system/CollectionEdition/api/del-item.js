/**
 * 采集版记录删除
 */
import api from 'api';

export default params => api.post('/boxserver/box/acquisition_board/delete', params);
