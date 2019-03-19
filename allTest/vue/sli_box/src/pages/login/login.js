// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue';
import App from './App';
import 'iview/dist/styles/iview.css';
import Router from 'vue-router';
// import store from '@/store';
Vue.config.productionTip = false;
Vue.use(Router);
const base = process.env.NODE_ENV === 'production' ? '/mbox/' : '';

const router = new Router({
  base,
  // mode: 'history',
  routes: [
    {
      path: '/',
      name: 'LoginForm',
      component: () => import('./LoginForm')
    },
    {
      path: '/login-form',
      name: 'LoginForm',
      component: () => import('./LoginForm')
    },
    {
      path: '/login-success',
      name: 'LoginSuccess',
      component: () => import('./LoginSuccess')
    }
  ]
});

/* eslint-disable no-new */
new Vue({
  router,
  el: '#app',
  components: { App },
  template: '<App/>'
  // store
});
