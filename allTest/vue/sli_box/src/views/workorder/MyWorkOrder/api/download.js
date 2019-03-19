/**
 * 工单-下载文件
 */
import api from 'api';

export default params => api.download(`/boxserver/tickets/file/${params.file_id}`, params);
