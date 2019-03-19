import apiGetList from 'api/purchaseOrder/get-list';

import listResultModel from './listResultModel';
import formatResult from './formatResult';
// 获取列表
let getList = async (data) => {
  let result = await apiGetList(data);
  return formatResult(listResultModel(result, (item) => {
    return {
      goods: item.details.map(x => {
        return {
          goodsId: x.goods_id,
          goodsimage: x.goods_image,
          goodsname: x.goods_name,
          price: x.price,
          quanity: x.quantity
        };
      }),
      orderNum: item.order_sn,
      logisticsstate: item.status_formatted,
      status: item.status,
      total: item.order_total,
      isRefundable: item.is_refundable,
      orderId: item.order_id
    };
  }));
};

export {
  getList
};
