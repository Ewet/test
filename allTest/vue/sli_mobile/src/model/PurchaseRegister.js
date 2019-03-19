import apiAgentList from 'api/purchaseRegister/agent-list';

// import listResultModel from './listResultModel';
import formatResult from './formatResult';
// 获取列表
let agentList = async (qrcode) => {
  let result = await apiAgentList({
    qrcode: qrcode
  });
  if (result.success) {
    let data = result.data;
    result.data = {
      orderId: data.order_id,
      boxOrderId: data.box_order_id,
      qrcodeImg: data.qrcode_src,
      allMoney: data.order_total,
      number: data.number_of_goods,
      name: data.merchant_name,
      boxNo: data.box_no,
      codeGoodsList: data.details.map(x => {
        return {
          goodsimage: x.goods_image,
          goodsname: x.goods_name,
          price: x.price,
          quanity: x.quantity
        };
      })
    };
  }

  return formatResult(result);
};

export {
  agentList
};
