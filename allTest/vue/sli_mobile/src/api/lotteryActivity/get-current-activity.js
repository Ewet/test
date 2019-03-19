/**
 * 查询当前正在进行中的面向消费者的抽奖活动
 *
 */
import api from '../api';
export default (params) => {
  return api.post('/platform/mobile/draw/customer/activity', params);
};
