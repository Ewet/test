
// 盒子广告-状态修改
import api from 'api';

export default params => api.put(`/boxserver/advert_plan_boxes/${params.box_id}/update`, params, {
  dataType: 'json'
});
