import qs from 'qs';

const getUrl = (pathname, query = {}) => {
  let url = `${location.origin}/mobile/${pathname}`;
  if (Object.keys(query).length) {
    url += `?${qs.stringify(query)}`;
  }
  return url;
};

export default (pathname, query) => {
  let url = '';
  if (pathname) {
    url = getUrl(pathname, query);
  }
  return url;
};
