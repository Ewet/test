/**
 *
 */
import api from 'api';

export default params => api.put(`/boxserver/adverts/${params.id}`, params, { dataType: 'json' });
