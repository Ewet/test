import Vue from 'vue';
import tips from '@/utils/tips';
import bus from './bus';
import { formatTime } from './date';
import { debounce } from 'lodash';
import {
  info,
  warning,
  confirm,
  success
} from '@/utils/modal';
import {
  UEDITOR_ACTION
} from '@/const/url';
import 'components';
import { format } from './params';
import richTextConfig from 'config/richTextConfig';
import 'plugins/echarts';

// 总线通信
Vue.prototype.$Bus = bus;
Vue.prototype.$g_emit = (eventName, payload) => {
  bus.$emit(eventName, payload);
};
Vue.prototype.$g_on = (eventName, func) => {
  bus.$on(eventName, func);
};
Vue.prototype.$g_off = (eventName, func) => {
  bus.$off(eventName, func);
};

// input框失去焦点时的验证
Vue.prototype.$rulesBlur = (msg, type = 'string') => ({
  required: true,
  message: msg,
  type,
  trigger: 'blur',
  transform (value) {
    return value.toString().trim();
  }
});
// input框值改变时的验证
Vue.prototype.$rulesChange = (msg, type = 'string') => ({
  required: true,
  message: msg,
  type,
  trigger: 'change'
});

// 对input输入框只能输入数字且保留两位小数的限制,返回值为string
Vue.prototype.$limitInputNumber = val => {
  const tempVal = parseFloat(val);
  if (isNaN(tempVal)) {
    return '0';
  } else {
    return tempVal.toFixed(2);
  }
};

// 日期格式化
Vue.prototype.$formatTime = formatTime;

// 防抖函数
Vue.prototype.$debounce = (func, delay = 300) => debounce(func, delay);

// 提示
Vue.prototype.$success = tips.success;
Vue.prototype.$error = tips.error;
Vue.prototype.$warning = tips.warning;
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

// 过滤参数
Vue.prototype.$filterParams = format;

// 弹层
Vue.prototype.$m_success = success;
Vue.prototype.$m_info = info;
Vue.prototype.$m_warning = warning;
Vue.prototype.$m_confirm = confirm;

// 全局变量处理
window.UEDITOR_SERVER_URL = UEDITOR_ACTION;

Vue.prototype.$richTextConfig = richTextConfig;

// 打开订单详情
Vue.prototype.$openOrderDetail = (params) => {
  Vue.prototype.$g_emit('openOrderDetail', params);
};

Vue.prototype.$closeOrderDetail = (params) => {
  Vue.prototype.$g_emit('closeOrderDetail', params);
};

// 打开退货详情
Vue.prototype.$openReturnDetail = (params) => {
  Vue.prototype.$g_emit('openReturnDetail', params);
};

Vue.prototype.$closeReturnDetail = (params) => {
  Vue.prototype.$g_emit('closeReturnDetail', params);
};

// 打开视频预览
Vue.prototype.$openPreviewVideo = (params) => {
  Vue.prototype.$g_emit('openPreviewVideo', params);
};

Vue.prototype.$closePreviewVideo = (params) => {
  Vue.prototype.$g_emit('closeReturnDetail', params);
};

// dev下开启性能监控模式
Vue.config.performance = process.env.NODE_ENV !== 'production';

export default {

};
