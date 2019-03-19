import apiGetList from './api/get-list';
import apiGetItem from './api/get-item';
import apiAddItem from './api/add-item';
import apiDelItem from './api/del-item';
import apiStartItem from './api/start-item';
import apiEndItem from './api/end-item';
import apiGetRecord from './api/get-record';
import apiUpdateItem from './api/update-item';

import formatResult from 'model/formatResult';
import listResult from 'model/listResult';

// 规则列表
const getList = async data => formatResult(listResult(await apiGetList(data), x => ({
  merchantId: x.merchant_id,
  ruleId: x.id,
  createTimeFormatted: x.create_time_formatted,
  dividedTimeFormatted: `${x.plan_start_time_formatted}-${x.plan_end_time_formatted}`,
  dividedProportion: x.proportion_formatted,
  lowestAmount: x.minimum_amount_formatted,
  remark: x.remark,
  status: x.status,
  statusFormatted: x.status_formatted,
  adder: x.creator_formatted
})));

const getItem = async (params) => {
  const result = await apiGetItem(params);
  if (result.success) {
    const data = result.data;
    result.data = {
      merchantId: data.merchant_id,
      ruleId: data.id,
      dividedDate: [data.plan_start_time_formatted, data.plan_end_time_formatted],
      dividedProportion: data.proportion_formatted,
      lowestAmount: data.minimum_amount_formatted,
      remark: data.remark
    };
  }
  return formatResult(result);
};
const getRecord = async (data) => {
  const result = await apiGetRecord(data);
  if (result.success) {
    const data = result.data;
    result.data = data.items.map(x => ({
      // merchantId: x.merchant_id,
      ruleId: x.rule_id,
      operationTimeformatted: x.create_time_formatted,
      operator: x.creator_formatted,
      operationTypeFormatted: x.operation_type_formatted,
      historicalData: x.old_data,
      latestData: x.new_data
    }));
    return formatResult(result);
  }
};
const addItem = async params => formatResult(await apiAddItem(params));
const updateItem = async params => formatResult(await apiUpdateItem(params));
const delItem = async params => formatResult(await apiDelItem(params));
const startItem = async params => formatResult(await apiStartItem(params));
const endItem = async params => formatResult(await apiEndItem(params));

export {
  getList,
  getItem,
  getRecord,
  addItem,
  updateItem,
  delItem,
  startItem,
  endItem
};
