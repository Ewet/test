export default (result) => {
  if (result.code === 401) {
    result.msg = '';
  }
  return result;
};
