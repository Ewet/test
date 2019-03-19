import config from './config';
var qs = require('querystring');
class WebSocketBuilder {
  constructor (data) {
    let { url,
      onOpen,
      onClose,
      onError,
      onMessage
    } = data;
    let fullURL = `${config.baseURL}${url}`;
    if (data.params) {
      let paramsStr = qs.stringify(data.params);
      fullURL += fullURL.includes('?') ? '' : '?' + paramsStr;
    }
    let _socket = new WebSocket(fullURL);
    _socket.onopen = (data) => {
      console.log('onOpen', data);
      onOpen(data);
    };
    _socket.onerror = (data) => {
      console.log('onError', data);
      onError(data);
    };
    _socket.onclose = (data) => {
      console.log('onclose', data);
      onClose(data);
    };
    _socket.onmessage = (result) => {
      console.log('onMessage', result);
      try {
        onMessage(JSON.parse(result.data));
      } catch (ex) {
        console.log('onMessage 数据结构异常', ex);
      }
    };
    this.socket = _socket;
  }
  send (data) {
    return this.socket.send(data);
  }
  close () {
    return this.socket.close();
  }
}

export default data => new WebSocketBuilder(data);
