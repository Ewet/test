/**
 * 采集版记录新增
 */
import api from 'api';

export default params => api.post('/boxserver/box/acquisition_board/create', params);
