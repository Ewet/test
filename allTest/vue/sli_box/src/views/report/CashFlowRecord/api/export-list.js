/**
 * 导出记录
 */
import api from 'api';

export default params => api.download('/platform/member_center/transfer_out/export_transfer_out_list', params);
