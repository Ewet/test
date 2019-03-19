import config from './config';

const qs = require('querystring');

class WebSocketBuilder {
  constructor (data) {
    const {
      url,
      onOpen,
      onClose,
      onError,
      onMessage
    } = data;
    let fullURL = `${config.baseURL}${url}`;
    if (data.params) {
      const paramsStr = qs.stringify(data.params);
      fullURL += fullURL.includes('?') ? '' : `?${paramsStr}`;
    }
    const _socket = new WebSocket(fullURL);
    _socket.onopen = onOpen;
    _socket.onerror = onError;
    _socket.onclose = onClose;
    _socket.onmessage = onMessage;
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
