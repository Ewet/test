/**
 * 单条记录化函数
 */
export default (data, formatFunc) => {
  let success = true;
  let msg = '';
  let _data = {};
  try {
    _data = formatFunc(data);
  } catch (ex) {
    success = false;
    msg = '，API数据结构错误！';
    console.log(data, '发生错误,', ex.message);
  }
  return { success, msg, data: _data };
};
