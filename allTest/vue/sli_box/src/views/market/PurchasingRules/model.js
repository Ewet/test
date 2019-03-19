import apiGetList from './api/get-list';
import apiUpdateItem from './api/update-item';
import apiAddItem from './api/add-item';
import apiDelItem from './api/del-item';
import apiGetItem from './api/get-item';
import apiGetTimeLimitRule from './api/get-timeLimit-rule';
import apiToVoid from './api/to-void';
import apiToConfirm from './api/to-confirm';
import apiGetOperationRecordData from './api/get-operationRecord-list';
import apiGetTimeLimitRuleItem from './api/get-timeLimitRule-item';
import apiCreateTimeLimitRule from './api/create-timeLimitRule';
import apiEditTimeLimitRule from './api/edit-timeLimitRule';

import listResult from 'model/listResult';
import formatResult from 'model/formatResult';

const getList = async data => formatResult(listResult(await apiGetList(data), x => ({
  goodsName: x.goods_name,
  goodsBOMCode: x.bom_code,
  commissionRatio: x.commission_rate,
  cappedAmount: x.commission_limit,
  proportion: x.proportion,
  id: x.id,
  applicationRules: x.name,
  startTime: x.start_time_formatted,
  endTime: x.end_time_formatted,
  remainingTime: x.remaining_time_formatted
})));

const getItem = async (id) => {
  const result = await apiGetItem({
    id
  });
  if (result.success) {
    const data = result.data;
    result.data = {
      proportion: data.proportion,
      goodsName: data.goods_name,
      goodsBOMCode: data.bom_code,
      commissionRatio: data.commission_rate,
      cappedAmount: data.commission_limit,
      id: data.id
    };
  }
  return formatResult(result);
};

const addItem = async (data) => {
  const result = await apiAddItem(data);
  return formatResult(result);
};

const updateItem = async (data) => {
  const result = await apiUpdateItem(data);
  return formatResult(result);
};

const delItem = async (id) => {
  const result = await apiDelItem({
    id
  });
  return formatResult(result);
};

// 获取限时规则列表
const getTimeLimitRule = async bomCode => {
  let result = await apiGetTimeLimitRule({
    bom_code: bomCode
  });
  if (result.success) {
    let data = result.data;
    result.data = {
      items: data.items.map(x => ({
        beingApplied: x.rule_apply,
        ruleName: x.name,
        commissionRatio: x.commission_rate,
        cappedAmount: x.commission_limit,
        startTime: x.start_time_formatted,
        endTime: x.end_time_formatted,
        statusFormatted: x.status_formatted,
        status: x.status,
        limitRuleId: x.time_limit_rule_id,
        boxRange: x.box_noes
      }))
    };
  }
  return formatResult(result);
};

// 作废限时规则
const toVoid = async id => {
  const result = await apiToVoid({
    time_limit_rule_id: id
  });
  return formatResult(result);
};

// 应用限时规则
const toConfirm = async id => {
  const result = await apiToConfirm({
    time_limit_rule_id: id
  });
  return formatResult(result);
};

// 操作记录
const getOperationRecordData = async id => {
  const result = await apiGetOperationRecordData({
    time_limit_rule_id: id
  });
  if (result.success) {
    const data = result.data;
    result.data = {
      items: data.items.map(x => ({
        operator: x.work_name,
        time: x.created_time_formatted,
        action: x.action_formatted
      }))
    };
  }
  return formatResult(result);
};

// 编辑限时规则时获取详情
const getTimeLimitRuleItem = async id => {
  const result = await apiGetTimeLimitRuleItem({
    time_limit_rule_id: id
  });
  if (result.success) {
    const data = result.data;
    result.data = {
      timelimitruleid: data.time_limit_rule_id,
      name: data.name,
      commissionRate: data.commission_rate,
      commissionLimit: data.commission_limit,
      startTime: data.start_time_formatted,
      endTime: data.end_time_formatted,
      boxRanges: data.box_data.map(x => ({
        merchantName: x.name,
        boxNo: x.box_no,
        boxId: x.box_id
      }))
    };
  }
  return formatResult(result);
};

// 增加限时规则
const createTimeLimitRule = async data => {
  return formatResult(await apiCreateTimeLimitRule(data));
};

// 编辑限时规则
const editTimeLimitRule = async data => {
  return formatResult(await apiEditTimeLimitRule(data));
};

export {
  getList,
  addItem,
  updateItem,
  delItem,
  getItem,
  getTimeLimitRule,
  toVoid,
  toConfirm,
  getOperationRecordData,
  getTimeLimitRuleItem,
  createTimeLimitRule,
  editTimeLimitRule
};
