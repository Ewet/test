// 终端管理-已选广告列表
import api from 'api';

export default params => api.get(`/boxserver/advert_plan_boxes/${params.box_id}`, params);
