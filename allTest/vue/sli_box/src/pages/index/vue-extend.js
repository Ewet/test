import Vue from 'vue';
import tips from '@/utils/tips';
import bus from './bus';
import {
  UEDITOR_ACTION
} from '@/const/url';

// 总线通信
Vue.prototype.$Bus = bus;

// 提示
Vue.prototype.$success = tips.success;
Vue.prototype.$error = tips.error;

// 封装回调处理
Vue.prototype.$fetchCB = ({
  success, data, msg, errorObj
}, successHandle, failHandle) => {
  if (success) {
    successHandle(data);
  } else if (failHandle) {
    failHandle({ msg, errorObj });
  } else {
    tips.error(msg);
  }
};

// 全局变量处理
window.UEDITOR_SERVER_URL = UEDITOR_ACTION;

export default {

};
