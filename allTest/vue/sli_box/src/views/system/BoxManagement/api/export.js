/**
 * 盒子管理-导出表格
 */
import api from 'api';

export default params => api.download('/boxserver/box/base/get_excel', params);
