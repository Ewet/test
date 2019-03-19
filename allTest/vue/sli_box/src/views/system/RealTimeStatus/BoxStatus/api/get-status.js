// import api from 'api';
// export default (params) => {
//   return api.post('/boxserver/box/box_status/status', params);
// };
import Builder from '@/websocket/builder';

export default (params) => {
  const a = new Builder({
    url: 'ws://nts.motaobox.com/tomcat/boxserver/box/box_status/status?box_id=316753593239710148',
    // wss://nts.motaobox.com/tomcat/boxserver/webSocketServer/dynamic?box_id=338633364644954270
    onOpen: (event) => {
      console.log('与服务器连接成功');
    },
    onError: (event) => { console.log('连接出错'); },
    onMessage: (event) => {
      console.log(event);
      return event.data;
    },
    onClose: (event) => { console.log('连接关闭'); }
  });
  return a;
};
