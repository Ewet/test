import 'plugins/iview';
import 'plugins/print';
import 'plugins/viewerjs';
import 'plugins/ant-design-vue';
import '@/assets/common.less';
import 'utils/vue-extend';
import Vue from 'vue';
import store from 'store';
Vue.config.productionTip = false;

const getPageInstance = ({ router, App }) => new Vue({
  el: '#app',
  router,
  store,
  components: { App },
  template: '<App/>'
});

export { getPageInstance };
