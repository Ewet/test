import apiGetList from './api/get-list';
import apiDelItem from './api/del-item';
import apiUpdateItem from './api/update-item';
import apiGetItem from './api/get-item';

import listResult from 'model/listResult';
import formatResult from 'model/formatResult';
import formatItem from 'model/formatItem';
import { getList as getRules } from 'views/market/DistributorRule/model';
import { getPresupposeMember } from 'views/personnel/Member/model';
import fecha from 'fecha';
import apiExportList from './api/export-list';
import apiSubordinateExport from './api/subordinate_export';

const getList = async (data) => {
  const result = await getPresupposeMember();
  let operationList = [];
  if (result.success) {
    operationList = result.data;
  }
  return formatResult(listResult(await apiGetList(data), x => ({
    boxNum: x.box_no,
    fans: x.user.avatar,
    avatar: x.user.avatar,
    name: x.user.nickname,
    phone: x.user.mobile,
    cumulativeCommission: x.aggregate_commission,
    paymentCommission: x.withdraw_commission,
    totalSubordinate: x.subordinate_quantity,
    registrationTime: x.create_time_formatted,
    auditTime: x.audi_time_formatted,
    status: x.status_formatted,
    traderType: x.trader_type,
    attention: 1,
    id: x.trader_id,
    userId: x.user_id,
    operationList,
    members: x.members.map(d => ({
      memberType: d.type.type_name,
      validityPeriod: d.duration > 0 ? fecha.format(new Date((d.create_time + d.duration * 24 * 3600) * 1000), 'YYYY-MM-DD') : '无限期',
      source: d.from_type_formatted,
      createTime: d.create_time_formatted,
      status: d.status_formatted
    }))
  })));
};

const delItem = async id => formatResult(await apiDelItem({
  trader_id: id
}));

const updateItem = async params => formatResult(await apiUpdateItem(params));

const getItem = async (id) => {
  const result = await apiGetItem({ trader_id: id });
  if (result.success) {
    const { success, data, msg } = formatItem(result.data, data => ({
      id: data.trader_id,
      traderType: data.is_special_vip,
      name: data.user.nickname,
      mobile: data.user.mobile,
      ruleId: data.rule_id || '-1'
    }));
    const ruleResult = await getRules();
    if (ruleResult.success) {
      data.ruleList = ruleResult.success ? ruleResult.data.items : [];
    }
    if (success) {
      result.data = data;
    } else {
      result.success = false;
      result.msg = msg;
    }
  }
  return formatResult(result);
};

const exportList = (data) => {
  apiExportList(data);
};
const subordinateExport = (data) => {
  apiSubordinateExport(data);
};

export {
  getList,
  delItem,
  updateItem,
  getItem,
  exportList,
  subordinateExport
};
