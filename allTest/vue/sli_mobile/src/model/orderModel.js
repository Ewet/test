import apiGetList from '@/api/order/get-list';
import apiGetOrderDetail from '@/api/order/sn-info';

import listResultModel from './listResultModel';
import formatResult from './formatResult';
// 获取列表
let getList = async (data) => {
  let result = await apiGetList(data);
  return formatResult(listResultModel(result, (item) => {
    return {
      'goods': item.goodsList.map(g => {
        return {
          'goodsimage': g.pic,
          'goodsname': g.goods_name,
          'picId': g.file_id,
          'price': g.price,
          'quanity': g.quantity,
          'originalprice': g.market_price
        };
      }),
      'storename': item.name,
      'sstatus': item.status,
      'isRefundable': item.is_refundable,
      'logisticsstate': item.status_format,
      'total': item.order_total,
      'totalquantity': item.goodsCount,
      'freight': item.ship_fee,
      'orderId': item.order_id,
      'orderSn': item.order_sn,
      'realPay': item.real_pay,
      'plfOrderId': item.plf_order_id, // 平台订单Id
      'invoiceId': item.invoice_id
    };
  }));
};

// 获取订单详情
const getOrderDetail = async orderSn => {
  let result = await apiGetOrderDetail({
    order_sn: orderSn
  });
  let success = result.success;
  let msg = result.message;
  let data = result.data;
  result = {
    storename: data.merchant.name,
    logisticsstate: data.status_formatted,
    goods: data.details.map((x) => {
      return {
        goodsId: x.goods.goods_id,
        goodsimage: x.goods.goods_image,
        goodsname: x.goods.goods_name,
        price: x.price,
        originalprice: x.goods.market_price,
        quanity: x.quantity
      };
    }),
    totalPrice: data.order_total,
    payWay: data.payment_method_formatted,
    payType: data.status_formatted,
    realPay: data.real_total,
    payableTotal: data.payable_total,
    orderNum: data.order_sn,
    orderId: data.order_id,
    payTime: data.paid_time_formatted,
    createTime: data.created_time_formatted,
    status: data.status,
    plfOrderId: data.plf_order_id // 平台订单Id
  };

  return {success, result, msg};
};

export {
  getList,
  getOrderDetail
};
