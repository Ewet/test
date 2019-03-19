/**
 * 缓存库
 *
 */

//  分割字符  随意(o^^o)
const splitStr = '(o^^o)';

//  根据key获取值
const getItem = (key) => {
  let now = new Date().getTime();
  let item = localStorage.getItem(key);
  //   是否存在缓存
  if (!item) {
    return null;
  }
  let index = item.lastIndexOf(splitStr);
  let value = item.substr(0, index);
  let endTime = item.substr(index + splitStr.length);
  //   缓存失效
  if (now > endTime) {
    //   清理过期缓存
    removeItem(key);
    return null;
  }
  try {
    return JSON.parse(value);
  } catch (e) {
    return null;
  }
};

// 根据key设置值，duration有效期
const setItem = (key, value, duration = 60 * 60 * 1000) => {
  if (key && value === null) {
    return removeItem(key);
  }
  let now = new Date().getTime();
  return localStorage.setItem(key, `${JSON.stringify(value)}${splitStr}${now + duration}`);
};

// 根据key删除缓存
const removeItem = (key) => {
  return localStorage.removeItem(key);
};

export {
  getItem,
  setItem,
  removeItem
};
