/**
 *
 */
import api from 'api';

export default params => api.post(`/boxserver/advert/${params.advert_id}/plans`, params);
