import { debounce } from 'lodash';
import { getMenu } from 'model/authManagement';

const pathname = process.env.NODE_ENV === 'development' ? '' : '/mbox';

const getAuthMenu = () => {
  getMenu().then(({ success, data, msg }) => {
    if (success) {
      const menu = data.menu.filter(x => x.items.length > 0);
      if (menu.length > 0) {
        location.replace(menu[0].routerName);
      } else {
        location.replace(`${pathname}/empty.html`);
      }
    } else {
      this.$error(msg);
    }
  });
};
// 跳转到登录
const jumpLogin = debounce(() => {
  sessionStorage.setItem('beforeJumpUrl', location.href);
  location.replace(`${pathname}/login.html`);
}, 500);
// 跳转到首页
const jumpIndex = debounce(() => {
  getAuthMenu();
  // location.replace(pathname + '/index.html');
}, 500);

export {
  jumpLogin,
  jumpIndex
};
