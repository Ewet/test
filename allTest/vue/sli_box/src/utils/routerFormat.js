import { getMenu } from 'model/authManagement';
import iView from 'iview';
import tips from './tips';

export default (router) => {
  router.beforeEach((to, from, next) => {
    if (to.name) {
      getMenu().then(({ success, data, msg }) => {
        // console.log('to', to);
        // console.log('data.map', data.map);
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
