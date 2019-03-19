import apiGetGender from 'api/enum/get-gender';
import apiGetPayMode from 'api/enum/get-pay-mode';
import apiGetPayStatus from 'api/enum/get-pay-status';
import apiGetShipStatus from 'api/enum/get-ship-status';
import apiGetUserStatus from 'api/enum/get-user-status';
import apiGetCommissionMode from 'api/enum/get-commission-mode';
import apiGetSubordinateCondition from 'api/enum/get-subordinate-condition';
import apiGetTraderCondition from 'api/enum/get-trader-condition';
import apiGetWithdrawMode from 'api/enum/get-withdraw-mode';
import apiGetList from 'api/enum/get-list';

const getGender = async () => formatEnumResult(await apiGetGender());

const getPayMode = async () => formatEnumResult(await apiGetPayMode());

const getPayStatus = async () => formatEnumResult(await apiGetPayStatus());

const getShipStatus = async () => formatEnumResult(await apiGetShipStatus());

const getUserStatus = async () => formatEnumResult(await apiGetUserStatus());

const getCommissionMode = async () => formatEnumResult(await apiGetCommissionMode(), false);

const getSubordinateCondition = async () => formatEnumResult(await apiGetSubordinateCondition(), false);

const getTraderCondition = async () => formatEnumResult(await apiGetTraderCondition(), false);

const getWithdrawMode = async () => formatEnumResult(await apiGetWithdrawMode(), false);

const getCanSettle = async () => formatEnumResult(await apiGetList('plf_distribution_cfg_can_settle'), false);

const formatEnumResult = ({ success, data, msg }, addAll = true) => {
  if (success) {
    data = data.map(x => ({
      name: x.enum_name,
      value: x.enum_id
    }));
    if (addAll) {
      data.unshift({
        name: '全部',
        value: '-1'
      });
    }
  }
  return { success, data, msg };
};

export {
  getGender,
  getPayMode,
  getPayStatus,
  getShipStatus,
  getUserStatus,
  getCommissionMode,
  getSubordinateCondition,
  getTraderCondition,
  getWithdrawMode,
  getCanSettle
};
