/**
 * 导出记录
 */
import api from 'api';

export default params => api.download('/platform/member_center/coupon/export_user_coupon_list', params);
