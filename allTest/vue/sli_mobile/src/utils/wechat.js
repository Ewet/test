import {getSign} from '@/model/wxModel';
const jsApiList = [
  'onMenuShareAppMessage',
  'onMenuShareTimeline',
  'updateAppMessageShareData',
  'updateTimelineShareData',
  'openLocation',
  'getLocation',
  'chooseImage',
  'uploadImage'
];
export default {
  // 获取JSSDK
  async getJSSDK (url) {
    // console.log('getJSSDK 配置URL');
    // console.log(url);
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
        jsApiList: jsApiList // 必填，需要使用的JS接口列表
      });
    }
  },
  getJSSDKAsync (url) {
    // console.log('getJSSDKAsync url', url);
    return new Promise((resolve) => {
      getSign({
        'jsUrl': url
      }).then(result => {
        if (result.success) {
          let data = result.data;
          wx.config({
            debug: false, // 开启调试模式,调用的所有api的返回值会在客户端alert出来，若要查看传入的参数，可以在pc端打开，参数信息会通过log打出，仅在pc端时才会打印。
            appId: data.appId, // 必填，公众号的唯一标识
            timestamp: data.timestamp, // 必填，生成签名的时间戳
            nonceStr: data.nonceStr, // 必填，生成签名的随机串
            signature: data.signature, // 必填，签名
            jsApiList: jsApiList // 必填，需要使用的JS接口列表
          });
        }
        resolve();
      });
    });
  },
  setWxShare (title, desc, link, imgUrl) {
    // console.log('setWxShare 参数');
    // console.log(Array.from(arguments));
    wx.ready(() => {
      let shareFriend = wx.updateAppMessageShareData || wx.onMenuShareAppMessage;
      let shareTime = wx.updateTimelineShareData || wx.onMenuShareTimeline;
      let params = {
        title: title, // 分享标题
        desc: desc, // 分享描述
        link: link, // 分享链接 默认以当前链接
        imgUrl: imgUrl, // 分享图标
        success () {
        },
        cancel () {
        }
      };
      // 分享给朋友
      shareFriend(params);
      // 分享到朋友圈
      shareTime(params);
    });
  },
  // 获取当前地理位置信息
  getLocation (callback) {
    wx.ready(function () {
      wx.getLocation({
        type: 'wgs84',
        success: res => {
          callback(res);
        },
        fail: (error) => {
          console.log(error);
        }
      });
    });
  },

  // 上传图片
  uploadImage (callback) {
    wx.ready(function () {
      wx.chooseImage({
        count: 1, // 默认9
        sizeType: ['original', 'compressed'], // 可以指定是原图还是压缩图，默认二者都有
        sourceType: ['album', 'camera'], // 可以指定来源是相册还是相机，默认二者都有
        success: function (res) {
          var localIds = res.localIds; // 返回选定照片的本地ID列表，localId可以作为img标签的src属性显示图片
          wx.uploadImage({
            localId: localIds[0], // 需要上传的图片的本地ID，由chooseImage接口获得
            isShowProgressTips: 1, // 默认为1，显示进度提示
            success: function (res) {
              let json = {};
              var serverId = res.serverId;// 返回图片的服务器端ID
              json['serverId'] = serverId;
              json['url'] = localIds[0];
              callback(json);
            },
            fail: function (res) {
              console.log(res);
            }
          });
        },
        fail: function (res) {
          console.log(res);
        }
      });
    });
  }

};
