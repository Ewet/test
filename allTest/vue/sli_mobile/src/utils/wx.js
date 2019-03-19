import {getSign} from '@/model/wxModel';
import { Toast } from 'vant';
import device from '@/utils/device';
import { log } from '@/model/logModel';
const share = async ({
  success,
  cancel,
  error,
  title,
  desc,
  img,
  url
}) => {
  if (device.isIOS) {
    url = window.ios_js_url;
  }
  let result = await getSign({
    'jsUrl': url
  });
  if (result.success) {
    let data = result.data;
    wx.config({
      debug: false, // 开启调试模式,调用的所有api的返回值会在客户端alert出来，若要查看传入的参数，可以在pc端打开，参数信息会通过log打出，仅在pc端时才会打印。
      appId: data.appId, // 必填，公众号的唯一标识
      timestamp: data.timestamp, // 必填，生成签名的时间戳
      nonceStr: data.nonceStr, // 必填，生成签名的随机串
      signature: data.signature, // 必填，签名
      jsApiList: ['onMenuShareTimeline', 'onMenuShareAppMessage'] // 必填，需要使用的JS接口列表
    });
    wx.ready(function () {
      let params = {
        title: title, // 分享标题
        link: data.url,
        imgUrl: img,
        desc: desc,
        success: function () {
          success && success();
        },
        cancel: function () {
          cancel && cancel();
        }
      };
      // 分享到朋友圈
      wx.onMenuShareTimeline(params);
      // 分享到朋友
      wx.onMenuShareAppMessage(params);
    });
    wx.error(function () {
      // error && error();
    });
  } else {
    Toast('获取签名失败');
  }
};

const pay = ({signParams, success, fail}) => {
  function onBridgeReady () {
    WeixinJSBridge.invoke(
      'getBrandWCPayRequest', signParams,
      function (res) {
        console.log('WeixinJSBridge.invoke output', res);
        if (res.err_msg === 'get_brand_wcpay_request:ok') {
          success && success(res);
        } else {
          log({
            content: JSON.stringify({
              name: '微信支付失败',
              res: res
            })
          });
          fail && fail(res);
        } // 使用以上方式判断前端返回,微信团队郑重提示：res.err_msg将在用户支付成功后返回    ok，但并不保证它绝对可靠。
      }
    );
  }
  if (typeof WeixinJSBridge === 'undefined') {
    if (document.addEventListener) {
      document.addEventListener('WeixinJSBridgeReady', onBridgeReady, false);
    } else if (document.attachEvent) {
      document.attachEvent('WeixinJSBridgeReady', onBridgeReady);
      document.attachEvent('onWeixinJSBridgeReady', onBridgeReady);
    }
  } else {
    onBridgeReady();
  }
};
export {
  share,
  pay
};
