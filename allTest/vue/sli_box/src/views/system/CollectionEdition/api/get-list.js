/**
 * 采集版列表查询
 */
import api from 'api';

export default params => api.post('/boxserver/box/acquisition_board/list', params);
