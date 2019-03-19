function isWeiXin () {
  var ua = navigator.userAgent.toLowerCase();
  return !(ua.match(/MicroMessenger/i) === 'micromessenger');
}

export {isWeiXin};
