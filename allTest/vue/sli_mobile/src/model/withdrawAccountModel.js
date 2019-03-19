/**
 * 提现账号模型
 */

import apiWithdrawAccountSave from '@/api/distribution/withdraw-account-save';
import apiWithdrawAccountDel from '@/api/distribution/withdraw-account-del';
import apiWithdrawAccountList from '@/api/distribution/withdraw-account-list';
import apiWithdrawAccountType from '@/api/distribution/withdraw-account-type';
import formatResult from './formatResult';
const save = async (data) => {
  let result = await apiWithdrawAccountSave(data);
  return formatResult(result);
};

const getList = async (data) => {
  let result = await apiWithdrawAccountList(data);
  if (result.success) {
    result.data = result.data.map((item) => {
      return {
        'username': item.name,
        'title': item.mode === '0' ? `${item.mode_formatted}` : `${item.mode_formatted}-${item.name}`,
        'id': item.id,
        'mode': item.mode
      };
    });
  }
  return formatResult(result);
};

const getType = async (data) => {
  let result = await apiWithdrawAccountType(data);
  if (result.success) {
    result.data = result.data.map((item) => {
      return {
        'username': item.name,
        'title': `${item.mode_formatted}-${item.title}`,
        'id': item.id,
        'mode': item.mode
      };
    });
  }
  return formatResult(result);
};
const del = async (id) => {
  let result = await apiWithdrawAccountDel({
    'id': id
  });
  return formatResult(result);
};
export {
  save,
  getList,
  getType,
  del
};
