/**
 * 取得当前会员的分销二维码
 */
import api from '../api';
export default (params) => {
  return api.post('/platform/recommend/award_info', params);
};
