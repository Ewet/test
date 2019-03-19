/**
 *
 */
import api from 'api';

export default params => api.put(`/boxserver/advert/${params.advert_id}/plans/${params.advert_plan_id}`, params, { dataType: 'json' });
