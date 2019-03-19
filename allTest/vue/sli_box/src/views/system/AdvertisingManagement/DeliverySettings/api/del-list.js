/**
 *
 */
import api from 'api';

export default params => api.del(`/boxserver/advert/${params.advert_id}/plans`, params);
