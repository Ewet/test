import Vue from 'vue';
import Router from 'vue-router';
import { getMenu } from 'model/authManagement';
import iView from 'iview';
import tips from './tips';

Vue.use(Router);
const base = process.env.NODE_ENV === 'production' ? '/mbox/' : '';

const createRouter = (routes) => {
  const router = new Router({
    base,
    routes
  });
  formatRouter(router);
  return router;
};

const formatRouter = (router) => {
  router.beforeEach((to, from, next) => {
    if (to.name) {
      getMenu().then(({ success, data, msg }) => {
        if (success) {
          if (data.map[to.name]) {
            iView.LoadingBar.start();
            next();
          } else {
            tips.error(msg);
            next(false);
          }
        } else {
          tips.error(msg);
          next(false);
        }
      });
    } else {
      next();
    }
  });
  router.afterEach(() => {
    iView.LoadingBar.finish();
    window.scrollTo(0, 0);
  });
};

export {
  createRouter,
  formatRouter
};
