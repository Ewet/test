
// 终端管理-批量删除广告
import api from 'api';

export default params => api.del('/boxserver/advert_plan_boxes',
  params);
