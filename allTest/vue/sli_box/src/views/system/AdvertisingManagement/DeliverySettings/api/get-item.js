/**
 *
 */
import api from 'api';

export default params => api.get(`/boxserver/advert/${params.advert_id}/plans/${params.advert_plan_id}`, params);
