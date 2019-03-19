/**
 * 分销配置模型
 */

import apiGetRelation from './api/get-relation';
import apiUpdateRelation from './api/update-relation';
import apiGetSettle from './api/get-settle';
import apiUpdateSettle from './api/update-settle';
import formatResult from 'model/formatResult';

const getRelation = async (data) => {
  const result = await apiGetRelation(data);
  result.data = {
    subordinate: result.data.tobe_subordinate,
    trader: result.data.tobe_trader,
    audit: result.data.tobe_trader_audi
  };
  return formatResult(result);
};

const updateRelation = async (data) => {
  const result = await apiUpdateRelation(data);
  return formatResult(result);
};

const getSettle = async (params) => {
  const result = await apiGetSettle(params);
  const data = result.data;
  result.data = {
    withdrawMethod: data.withdraw_mode,
    withdrawLimit: data.withdraw_sill,
    calculationMethod: data.withdraw_commission_mode,
    withdrawFee: data.withdraw_brokerage,
    withdrawFeeStart: data.withdraw_brokerage_free_start,
    withdrawFeeEnd: data.withdraw_brokerage_free_end,
    settlementDays: data.withdraw_settlement_cycle,
    canSettle: data.can_settle,
    contributionlimit: data.contribution_limit,
    commonproportion: data.shareholder_common_proportion,
    motaoproportion: data.shareholder_motao_proportion
  };
  return formatResult(result);
};

const updateSettle = async (data) => {
  const result = await apiUpdateSettle(data);
  return formatResult(result);
};
export {
  getRelation,
  updateRelation,
  getSettle,
  updateSettle
};
