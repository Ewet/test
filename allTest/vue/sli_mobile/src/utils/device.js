// 判断设备
export default {
  isIOS: /(iPhone|iPad|iPod|iOS)/i.test(navigator.userAgent),
  isAndroid: /(Android)/i.test(navigator.userAgent)
};
