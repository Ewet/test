// import api from '../api';
// export default (params) => {
//   return api.post('/boxserver/webSocketServer/shopping/cart', params);
// };
import Builder from '@/websocket/builder';
// import {BaseUrl} from 'api/config/config.dev.js';
export default (params) => {
  let a = new Builder({
    // url: BaseUrl + '/boxserver/webSocketServer/shopping/cart' + params,
    url: 'ws://192.168.1.132:8080/boxserver/webSocketServer/shopping/cart?box_id=316753593239710148',
    onOpen: (event) => {
      console.log('与服务器连接成功');
    },
    onError: (event) => { console.log('连接出错'); },
    onMessage: (event) => {
      return event.data;
    },
    onClose: (event) => { console.log('连接关闭'); }
  });
  return a;
};
