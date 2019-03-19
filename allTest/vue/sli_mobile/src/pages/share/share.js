// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue';
import App from './App';
import router from './router';
import '@/assets/icon.less';
import '@/assets/common.less';
import bus from './bus';
import VueLazyload from 'vue-lazyload';
import device from '@/utils/device';
import {
  go,
  replace,
  back
} from '@/utils/redirect';
Vue.use(VueLazyload, {
  loading: require('@/assets/loading.gif')
});
Vue.config.productionTip = false;
Vue.device = device;
/* eslint-disable no-new */
Vue.prototype.$Bus = bus;
Vue.prototype.$go = go;
Vue.prototype.$replace = replace;
Vue.prototype.$back = back;
Vue.prototype.$showSpin = () => bus.$emit('showSpin');
Vue.prototype.$hideSpin = () => bus.$emit('hideSpin');

new Vue({
  el: '#app',
  router,
  components: {
    App
  },
  template: '<App/>'
});
