const autoPlay = callback => {
  if (window.WeixinJSBridge) {
    window.WeixinJSBridge.invoke('getNetworkType', {}, (res) => {
      setTimeout(() => {
        callback();
      }, 300);
    });
  } else {
    document.addEventListener('WeixinJSBridgeReady', () => {
      window.WeixinJSBridge.invoke('getNetworkType', {}, (res) => {
        setTimeout(() => {
          callback();
        }, 300);
      });
    }, false);
  }
};

export {
  autoPlay
};
