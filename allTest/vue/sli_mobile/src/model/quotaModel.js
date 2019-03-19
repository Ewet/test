/**
 * 我的配额模型
 */

import apiQuota from '@/api/distribution/quota';
import formatResult from './formatResult';

const getQuota = async (data) => {
  let result = await apiQuota(data);
  if (result.success) {
    let data = result.data;
    result.data = {
      'commissionlimit': data.commission_limit, // 总额度
      'residue': data.residue_commission_limit // 剩余额度
    };
  }
  return formatResult(result);
};

export {
  getQuota
};
