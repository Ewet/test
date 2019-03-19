export default ({success, msg, data}, itemCallback) => {
  if (success) {
    let items = data.items;
    if (itemCallback) {
      items = items.map(x => {
        return itemCallback(x);
      });
    }
    let pageNum = data.pagination.cur_page;
    let total = data.pagination.record_count;
    data = {
      items,
      pageNum,
      total,
      'hasMore': data.pagination.cur_page < data.pagination.total_page
    };
  }
  return {success, msg, data};
};
