import api from 'api';

export default params => api.post('/boxserver/weixin/message/list', params);