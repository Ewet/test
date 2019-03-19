import apiGetList from './api/get-list';
import apiGetItem from './api/get-item';
import apiDeterminationProcessing from './api/determination-processing';

import formatResult from 'model/formatResult';
import listResult from 'model/listResult';

const getItem = async (id) => {
  const result = await apiGetItem({
    alert_id: id
  });
  if (result.success) {
    const data = result.data;
    result.data = {
      boxNum: data.box_no,
      alertId: data.alert_id,
      alertNo: data.alert_no,
      createdTime: data.created_time_formatted,
      alterType: data.type_formatted,
      alertSource: data.source_formatted,
      alertCode: data.code_formatted,
      alertLevel: data.level_formatted,
      dataDetail: data.data
    };
  }
  return formatResult(result);
};
// 补货列表
const getList = async data => formatResult(listResult(await apiGetList(data), x => ({
  createdTime: x.created_time_formatted,
  boxNum: x.box_no,
  alarmType: x.type_formatted,
  alarmLevel: x.level_formatted,
  alarmCode: x.code_formatted,
  alarmSource: x.source_formatted,
  processingState: x.is_handled_formatted,
  alertId: x.alert_id,
  isHandled: x.is_handled
})));

// 确定处理
const determinationProcessing = async alertId => formatResult(await apiDeterminationProcessing({
  alert_id: alertId
}));

export {
  getList,
  getItem,
  determinationProcessing
};
