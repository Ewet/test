import apiGetList from './api/get-list';
import apiDataExport from './api/data-export';

import formatResult from 'model/formatResult';
import listResult from 'model/listResult';
// 补货列表
const getList = async data => formatResult(listResult(await apiGetList(data), x => ({
  applyId: x.purchasing_apply_id,
  auditTime: x.auditing_time,
  affiliatedMerchant: x.merchant_name,
  name: x.name,
  phone: x.mobile,
  wechat: x.nickname,
  wechatId: x.wxuser_id,
  remark: x.auditing_remark,
  auditResult: x.auditing_status,
  auditer: x.auditor
})));
const dataExport = async (data) => {
  const result = await apiDataExport(data);
  return formatResult(result);
};
export {
  getList,
  dataExport
};
