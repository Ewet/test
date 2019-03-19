/**
 * 查看备注
 */
import api from 'api';

export default params => api.post('/boxserver/box/notification/review_remark', params);
