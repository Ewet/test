
// 终端管理-导出
import api from 'api';

export default params => api.download('/boxserver/advert_plan_boxes/export', params);
