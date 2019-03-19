import apiGetList from './api/get-list';
import apiAddItem from './api/add-item';
import formatResult from 'model/formatResult';
import listResult from 'model/listResult';

const getList = async data => formatResult(listResult(await apiGetList(data), x => ({
  id: x.message_id,
  phone: x.mobile,
  content: x.message,
  operater: x.sent_by_formatted,
  time: x.created_time_formatted
})));

const addItem = async params => formatResult(await apiAddItem(params));

export {
  getList,
  addItem
};
