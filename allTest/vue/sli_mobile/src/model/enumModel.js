import apiGetList from '@/api/enum/get-list';
import formatResult from './formatResult';

const formatEnumResult = ({success, data}, addAll = true) => {
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
  return {success, data};
};

const getWithDrawMode = async () => {
  let result = await apiGetList({
    param_key: 'plf_distribution_withdraw_account_mode'
  });
  return formatResult(formatEnumResult(result, false));
};

export {
  getWithDrawMode
};
