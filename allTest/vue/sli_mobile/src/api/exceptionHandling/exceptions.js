
import api from '../api';
export default (params) => {
  return api.post('/boxserver/mobile/replenishment/collate/exceptions',
    params,
    {
      headers: {
        'Content-Type': 'application/json;charset=UTF-8'
      }
    });
};
