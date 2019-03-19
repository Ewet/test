import apiGetList from './api/get-list';
import apiChangeRead from './api/change-read';
import formatResult from 'model/formatResult';
import listResult from 'model/listResult';

const getList = async data => formatResult(listResult(await apiGetList(data), x => ({
  time: x.created_formatted,
  name: x.name,
  mobile: x.contact,
  content: x.message,
  id: x.website_message_board_id,
  isReaded: x.is_read
})));

const changeRead = async data => formatResult(await apiChangeRead(data));

export {
  getList,
  changeRead
};
