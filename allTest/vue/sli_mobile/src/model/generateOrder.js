/**
 * 商品详情
 */

import apiGetItem from 'api/generateOrder/get-orderId';
import formatResult from './formatResult';

const generateOrder = async (qrCode) => {
  let result = await apiGetItem({
    qrcode: qrCode
  });
  return formatResult(result);
};

export {
  generateOrder
};
