/**
 * vip会员支付页面签名
 */

import apiBuyMemberships from '@/api/distribution/buy-memberships';
import formatResult from './formatResult';
const getWxpaySignature = async (data) => {
  let result = await apiBuyMemberships(data);
  if (result.success) {
    let data = result.data;
    result.data = {
      'memberType': data.member_type,
      'paySignature': data.pay_signature
    };
  }
  return formatResult(result);
};

export {
  getWxpaySignature
};
