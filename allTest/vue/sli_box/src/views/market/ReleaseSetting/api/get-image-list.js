/**
 * 获取图片列表
 */
import api from 'api';

export default params => api.post('/platform/member_center/coupon/grant_csm_img_list', params);
