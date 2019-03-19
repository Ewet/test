
import formatItem from 'model/formatItem';

export default (
  {
    success, msg, data, code, errorObj
  },
  itemFormat = () => ({}),
  resultFormat = () => ({})
) => {
  let { items, pagination } = data;
  let _msg = '';
  if (items) {
    items = items.map((x) => {
      const { success, data, msg } = formatItem(x, itemFormat);
      if (success) {
        return data;
      }
      _msg = msg;
      return {};
    });

    data = {
      items,
      ...resultFormat(data)
    };
    if (pagination) {
      const pageNum = pagination.cur_page;
      const total = pagination.record_count;
      data.pageNum = pageNum;
      data.total = total;
    } else {
      data.pageNum = 1;
      data.total = data.items.length;
    }
  }
  if (code === 401) {
    msg = '';
  }
  if (_msg) {
    msg = _msg;
    success = false;
  }
  return {
    success, msg, data, errorObj
  };
};
