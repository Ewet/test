// import link from '@/utils/link';
// import device from '@/utils/device';
import Router from '@/pages/index/router';
let map = {};
Router.options.routes.forEach(route => {
  map[route.name] = route.path.replace('/', '');
});
const redirect = ({
  path,
  query,
  isReplace,
  name
}) => {
  isReplace = !!isReplace;
  if (name && !path) {
    path = map[name];
  }
  query = query || {};
  Object.assign(query, {
    '_vt': new Date().getTime()
  });
  if (!isReplace) {
    Router.push({
      path,
      query
    });
  } else {
    Router.replace({
      path,
      query
    });
  }

  // let url = link(path, query);
  // if (!isReplace) {
  //   location.replace(url);
  // } else {
  //   localStorage.setItem('_pre_url', url);
  //   location.href = url;
  // }
  // if (device.isAndroid) {
  //   if (!isReplace) {
  //     Router.push({
  //       path,
  //       query
  //     });
  //   } else {
  //     Router.replace({
  //       path,
  //       query
  //     });
  //   }
  // } else {
  //   let url = link(path, query);
  //   if (!isReplace) {
  //     location.replace(url);
  //   } else {
  //     localStorage.setItem('_pre_url', url);
  //     location.href = url;
  //   }
  // }
};

const go = (data) => {
  redirect(Object.assign({ ...data,
    isReplace: false
  }));
};
const replace = (data) => {
  redirect(Object.assign({ ...data,
    isReplace: true
  }));
};

const back = () => {
  Router.back();
  // if (document.referrer && !document.referrer.includes('mobile')) {
  //   location.href = document.referrer;
  // } else {
  //   Router.back();
  // }
  // if (device.isAndroid) {
  //   alert('安卓');
  //   Router.back();
  // } else {
  //   alert('IOS');
  //   localStorage.getItem('_pre_url');
  //   Router.back();
  // }
};

export {
  go,
  replace,
  back
};
