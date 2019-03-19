// 补货完毕
import api from '../api';
export default (params) => {
  return api.post('/boxserver/mobile/replenishment/replenishment_submit',
    params,
    {
      headers: {
        'Content-Type': 'application/json;charset=UTF-8'
      }
    });
};
