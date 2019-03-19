/**
 * 获取查询剩余抽奖次数
 */
import api from '../api';
export default (params) => {
  return api.post('/platform/mobile/draw/agent/opportunities', params);
};
