/**
 * 代购申请
 */

import apiPurchasingCheck from '@/api/purchaseApplication/check';
import formatResult from './formatResult';
import listResultModel from './listResultModel';
import apiApply from '@/api/purchaseApplication/apply';
import apiGetMerchantList from '@/api/purchaseApplication/get-merchant-list';
const purchasingCheck = async (data) => {
  let result = await apiPurchasingCheck(data);
  if (result.success) {
    let data = result.data;
    result.data = {
      'reason': data.auditing_remark,
      'status': data.code
    };
  }
  return formatResult(result);
};

const apply = async (data) => {
  return formatResult(await apiApply(data));
};

let getMerchantList = async (data) => {
  let result = await apiGetMerchantList(data);
  return formatResult(listResultModel(result, (item) => {
    return {
      'merchantId': item.merchant_id,
      'merchantName': item.name
    };
  }));
};
export {
  purchasingCheck,
  apply,
  getMerchantList
};
