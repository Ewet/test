import apiGetList from '@/api/differenceDetails/get-list';
import apiOrdersignature from '@/api/differenceDetails/order-signature';
// import listResultModel from './listResultModel';
import formatResult from './formatResult';
// 获取列表
const getList = async (data) => {
  let result = await apiGetList(data);
  if (result.success) {
    let items = result.data.items;
    result.data.items = items.map(x => {
      return {
        'goodsName': x.goods_name, // 系统结算的商品名
        'goodsImage': x.goods_image, // 系统结算的商品图片
        'quantity': x.quantity, // 系统结算的商品数量
        'actuallyPaid': x.real_total_price, // 系统结算的商品单价
        'price': x.price, // 商品单价
        'tobeGoodsName': x.tobe_goods_name, // 实际取走的商品名
        'tobeGoodsImage': x.tobe_goods_image, // 实际取走的商品图片
        'tobeGoodsPrice': x.tobe_goods_price, //  实际取走的商品单价
        'tobeQuantity': x.tobe_quantity, // 实际取走的商品数量
        'amount': x.amount, // 金额(正数表示退回金额，负数表示需补金额)
        'remarks': x.remarks // 备注
      };
    });
  }
  return formatResult(result);
};

const getWxpaySignature = async (correctionOrderId) => {
  let result = await apiOrdersignature({
    'correction_order_id': correctionOrderId
  });
  if (result.success) {
    let data = result.data;
    result.data = {
      'appId': data.appId, // 公众号名称，由商户传入
      'timeStamp': data.timeStamp, // 时间戳，自1970年以来的秒数
      'nonceStr': data.nonceStr, // 随机串
      'package': data.package,
      'signType': data.signType, // 微信签名方式：
      'paySign': data.paySign// 微信签名
    };
  }
  return formatResult(result);
};

export {
  getList,
  getWxpaySignature
};
