import apiGetList from './api/get-list';
import formatResult from 'model/formatResult';
import listResult from 'model/listResult';

// 功能调用日志记录
const getList = async data => formatResult(listResult(await apiGetList(data), x => ({
  operater: x.work_name,
  operaterAddress: x.url,
  operaterFunction: x.resources_name,
  operaterTiem: x.optime_fromat
})));
export {
  getList
};
