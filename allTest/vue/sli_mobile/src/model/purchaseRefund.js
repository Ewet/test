import apiGetList from 'api/purchaseRefund/get-list';
import apiConfirmRefund from 'api/purchaseRefund/confirm-refund';

import formatResult from './formatResult';
// 获取列表
let getRefundList = async (orderId) => {
  let result = await apiGetList({
    order_id: orderId
  });
  let data = result.data;
  result.data = {
    orderNum: data.order_sn,
    status: data.status,
    total: data.totalPrice,
    totalNum: data.totalQuantity,
    goods: data.goodsList.map(x => {
      return {
        goodsId: x.goods_id,
        goodsimage: x.image_url,
        goodsname: x.goods_name,
        price: x.price,
        quanity: x.quantity,
        retireQuantity: x.quantity,
        area: x.layer_no
      };
    })
  };
  return formatResult(result);
};

// 确认退货
const confirmRefund = async data => {
  let result = await apiConfirmRefund(data);
  return formatResult(result);
};

export {
  getRefundList,
  confirmRefund
};
