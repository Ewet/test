// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue';
import App from './App';
import { getPageInstance } from 'utils/pageHelper';
Vue.config.productionTip = false;
export default getPageInstance({
  App
});
