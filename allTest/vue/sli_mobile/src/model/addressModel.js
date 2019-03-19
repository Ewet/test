import apiGetList from '@/api/address/get-list';
import formatResult from './formatResult';

let getList = async (data) => {
  let result = await apiGetList(data);
  if (result.success) {
    let items = result.data.items;
    items.forEach(item => {
      item.checked = false;
    });
    return {
      success: result.success,
      items: items,
      hasMore: result.pagination.cur_page < result.pagination.total_page
    };
  }
  return formatResult(result);
};
export {
  getList
};
