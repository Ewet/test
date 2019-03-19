import Vue from 'vue';
import { loadLanguageAsync } from 'utils/i18n-setup';
export default router => {
  router.beforeEach((to, from, next) => {
    window.isFirstPage = from.name === null && to.name;
    if (Vue.prototype.$device.isIOS && !window.ios_js_url) {
      window.ios_js_url = document.URL;
    }
    const lang = to.query.lang;// || 'zh-cn';
    const callback = () => {
      if (to.matched.some(record => record.meta.requiresAuth)) {
        next();
      } else {
        Vue.prototype.$tips('又想偷偷进来了你～，功能还没开放窝');
        next({
          name: '404'
        });
      }
    };
    loadLanguageAsync(lang).then(() => {
      callback();
    }).catch(() => {
      callback();
    });
  });

  router.afterEach((to, from, next) => {
    if (to.name !== 'MemberQR') {
      let url = `https://${location.host}/mobile${to.fullPath}`;
      if (Vue.prototype.$device.isIOS) {
        if (!window.wxConfig) {
          Vue.prototype.$wechat.getJSSDKAsync(window.ios_js_url).then(() => {
            window.wxConfig = true;
            let imgSrc = 'https://' + location.hostname + router.options.base + 'motao.png';
            Vue.prototype.$wechat.setWxShare('摩萄盒子', '专业无人葡萄酒销售', url, imgSrc);
          });
        } else {
          let imgSrc = 'https://' + location.hostname + router.options.base + 'motao.png';
          Vue.prototype.$wechat.setWxShare('摩萄盒子', '专业无人葡萄酒销售', url, imgSrc);
        }
      } else {
        Vue.prototype.$wechat.getJSSDKAsync(url).then(() => {
          let imgSrc = 'https://' + location.hostname + router.options.base + 'motao.png';
          Vue.prototype.$wechat.setWxShare('摩萄盒子', '专业无人葡萄酒销售', url, imgSrc);
        });
      }
    }
    window.scrollTo(0, 0);
  });
};
