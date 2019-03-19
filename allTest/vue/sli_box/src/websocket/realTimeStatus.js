import builder from './builder';

export default (params, callback) => builder({
  url: '/boxserver/webSocketServer/dynamic',
  params,
  onMessage: (evt) => {
    callback.onMessage && callback.onMessage(evt);
  },
  onOpen: (evt) => {
    callback.onOpen && callback.onOpen(evt);
  },
  onError: (evt) => {
    callback.onError && callback.onError(evt);
  },
  onClose: (evt) => {
    callback.onClose && callback.onClose(evt);
  }
});
