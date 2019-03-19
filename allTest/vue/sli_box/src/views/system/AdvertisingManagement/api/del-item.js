/**
 *
 */
import api from 'api';

export default params => api.del(`/boxserver/adverts/${params.id}`, params);
