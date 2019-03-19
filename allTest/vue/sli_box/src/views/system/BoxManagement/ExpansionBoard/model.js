import apigetExpansionBoardList from '../api/get-expansionBoard-list';
import apiAddExponsionBoard from '../api/add-exponsionBoard';
import apiDelExponsionBoard from '../api/del-exponsionBoard';

import formatResult from 'model/formatResult';
// import listResult from 'model/listResult';

// 获取扩展板列表
const getExpansionBoardList = async (id) => {
  const result = await apigetExpansionBoardList({
    acquisition_id: id
  });
  if (result.success) {
    const data = result.data;
    result.data = {
      pageNum: data.pagination.cur_page,
      total: data.pagination.record_count,
      items: data.items.map(d => ({
        expansionBoardId: d.extension_id,
        acquisitionId: d.acquisition_id,
        expansionBoardNum: d.extension_no,
        occlusionLevel: d.blocked_level_formatted,
        channelsNum: d.number_of_channels,
        createTime: d.created_formatted
      }))
    };
  }
  return formatResult(result);
};
// 新增扩展板
const addExponsionBoard = async (data) => {
  const result = await apiAddExponsionBoard(data);
  return result;
};
// 删除扩展板
const delExponsionBoard = async (data) => {
  const result = await apiDelExponsionBoard(data);
  return result;
};
export {
  getExpansionBoardList,
  addExponsionBoard,
  delExponsionBoard
};
