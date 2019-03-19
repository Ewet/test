import apiGetList from './api/get-list';
import apiGetItem from './api/get-item';
import apiPass from './api/get-pass';
import apiDataExport from './api/data-export';

import formatResult from 'model/formatResult';
import listResult from 'model/listResult';
// 补货列表
const getList = async data => formatResult(listResult(await apiGetList(data), x => ({
  applyId: x.purchasing_apply_id,
  auditTime: x.created_time,
  affiliatedMerchant: x.merchant_name,
  name: x.name,
  phone: x.mobile,
  wechat: x.nickname,
  wechatId: x.wxuser_id,
  remark: x.apply_remark,
  auditStatus: x.auditing_status,
  status: x.status
})));

const getItem = async (id) => {
  const result = await apiGetItem({
    purchasing_apply_id: id
  });
  if (result.success) {
    return formatResult(result);
  }
};
const pass = async (data) => {
  const result = await apiPass(data);
  return formatResult(result);
};
const dataExport = async (data) => {
  const result = await apiDataExport(data);
  return formatResult(result);
};
export {
  getList,
  getItem,
  pass,
  dataExport
};
