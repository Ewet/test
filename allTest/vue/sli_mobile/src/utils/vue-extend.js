import Vue from 'vue';
import { Toast } from 'vant';
import bus from './bus';
import device from '@/utils/device';
import wechat from '@/utils/wechat';

import {
  go,
  replace,
  back
} from '@/utils/redirect';
import VueClipboard from 'vue-clipboard2';

VueClipboard.config.autoSetContainer = true; // add this line
Vue.use(VueClipboard);

// 成功提示
Vue.prototype.$success = params => {
  if (typeof params === 'string' && !params) {
    return false;
  }
  Toast(params);
};

// 失败提示
Vue.prototype.$error = params => {
  if (typeof params === 'string' && !params) {
    return false;
  }
  Toast(params);
};

// 警告提示
Vue.prototype.$warning = params => {
  if (typeof params === 'string' && !params) {
    return false;
  }
  Toast(params);
};

// 普通提示
Vue.prototype.$tips = params => {
  if (typeof params === 'string' && !params) {
    return false;
  }
  Toast(params);
};

// 确认
Vue.prototype.$confirm = params => {
  Toast(params);
};

// 显示全局加载层
Vue.prototype.$Bus = bus;
Vue.prototype.$showSpin = () => bus.$emit('showSpin');
Vue.prototype.$hideSpin = () => bus.$emit('hideSpin');

// 跳转控制
Vue.prototype.$go = go;
Vue.prototype.$replace = replace;
Vue.prototype.$back = back;

Vue.prototype.$device = device;
Vue.prototype.$wechat = wechat;
