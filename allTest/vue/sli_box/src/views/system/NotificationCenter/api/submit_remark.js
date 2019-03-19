/**
 * 通知中心填写备注
 */
import api from 'api';

export default params => api.post('/boxserver/box/notification/submit_remark', params);
