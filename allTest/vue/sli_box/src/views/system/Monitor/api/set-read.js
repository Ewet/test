import api from 'api';

export default params => api.post('/boxserver/box/uio_event/modify', params);
