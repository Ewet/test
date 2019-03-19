// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue';
import App from './App';
import '@/assets/icon.less';
import '@/assets/common.less';
import 'utils/remLayout';
import 'utils/vue-extend';
import 'utils/vue-plugin';
import router from './router';
import store from '@/store';

import { i18n } from 'utils/i18n-setup';
import routetSetting from 'utils/router-setting';
routetSetting(router);
Vue.config.productionTip = false;
/* eslint-disable no-new */

var VConsole = require('vconsole');
new VConsole();

new Vue({
  el: '#app',
  router,
  store,
  components: {
    App
  },
  template: '<App/>',
  i18n
});
