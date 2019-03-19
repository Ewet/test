import apiGetList from '@/api/order/get-list-old';
import listResultModel from './listResultModel';
import formatResult from './formatResult';
// 获取列表
let getList = async (data) => {
  let result = await apiGetList(data);
  return formatResult(listResultModel(result, (item) => {
    return {
      'storename': item.store_name,
      'sstatus': item.pay_status_formatted,
      'logisticsstate': item.ship_status_formatted,
      'goods': item.goods_list.map(g => {
        return {
          'goodsimage': g.goods_image,
          'goodsname': g.goods_name,
          'originalprice': g.o_price,
          'price': g.price,
          'quanity': g.quantity
        };
      }),
      'total': item.order_total,
      'totalquantity': item.total_quantity, // 商品总数
      'freight': item.ship_fee, // 运费
      'orderid': item.order_id,
      'paystatus': item.pay_status,
      'showMoreBtn': false
    };
  }));
};

export {
  getList
};
