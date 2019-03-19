/**
 * 商品详情
 */

import apiCartDiversion from 'api/cartDiversion/get-cart-diversion';
import formatResult from './formatResult';

const cartDiversion = async (qrCode) => {
  let result = await apiCartDiversion({
    qrcode: qrCode
  });
  return formatResult(result);
};

export {
  cartDiversion
};
