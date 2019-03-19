const format = (params) => {
  const keys = Object.keys(params);
  if (!keys.length) {
    return {};
  }
  return keys.reduce((initObj, key) => {
    let val = params[key];
    if (typeof (val) === 'string') {
      val = val.trim();
    }
    if (val !== null && val !== undefined && val !== '') {
      initObj[key] = val;
    }
    return initObj;
  }, {});
};

export {
  format
};
