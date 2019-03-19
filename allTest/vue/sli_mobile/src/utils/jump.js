import { debounce } from 'lodash';
import Router from '@/pages/index/router';
import { wxLogin
} from '@/model/memberModel';
import { isWeiXin } from './brower';
import { getItem, setItem } from './cache';
// 跳转到登陆
const jumpLogin = debounce(() => {
  // console.log('Router', Router);
  // Router.replace({
  //   name: 'MemberLogin'
  // });
  setItem('beforeLoginUrl', location.href);
  Router.replace({
    name: 'UserLogin'
  });
//   location.replace(pathname + '/member-login');
}, 500);
// 跳转到首页
const jumpIndex = debounce(() => {
  let url = getItem('beforeLoginUrl');
  if (url) {
    setItem('beforeLoginUrl');
    location.replace(url);
  } else {
    Router.replace({
      name: 'MemberCenter'
    });
  }
}, 500);

const boxLogin = () => {
  let callback = encodeURIComponent(location.href);
  let url = `/box/index.php?module=weixin&action=login&forward=${callback}`;
  location.href = url;
};

// 微信授权登陆
const authLogin = () => {
  if (process.env.NODE_ENV === 'production') {
    // boxLogin();
    jumpLogin();
  } else {
    let callbackURL = `${location.origin}${Router.options.base}callback`;
    if (isWeiXin()) {
      wxLogin({
        callbackURL
      }).then(result => {
        if (result.success) {
          jumpIndex();
        } else if (result.code === 300) {
          // boxLogin();
          location.href = result.errorObj;
        } else {
          alert('未知错误' + result.msg);
        }
      });
    } else {
      jumpLogin();
    }
  }
};

export {
  jumpLogin,
  jumpIndex,
  authLogin,
  boxLogin
};
