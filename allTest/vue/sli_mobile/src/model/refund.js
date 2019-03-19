import apiGetList from '@/api/refund/get-list';
import apiGetItem from '@/api/refund/get-item';
import apiGetOrderDetail from '@/api/order/sn-info';
import apiModifyItem from '@/api/refund/modify-item';
import apiAddItem from '@/api/refund/add-item';
import apiCancelRefund from '@/api/refund/cancel_refund';
// import apiModifyItem from '@/api/refund/apply-audit';
import listResultModel from './listResultModel';
import formatResult from './formatResult';
// 获取列表
let getList = async (data) => {
  let result = await apiGetList(data);
  return formatResult(listResultModel(result, (item) => {
    return {
      'key': guid(),
      'refundId': item.refund_id,
      'status': item.status_formatted,
      'statu': item.status,
      'goods': item.refund_details.map(g => {
        return {
          'goodsImg': g.goods.goods_image,
          'goodsName': g.goods.goods_name,
          // 'originalprice': g.o_price,
          'price': g.price,
          'quanity': g.quantity,
          'integral': g.refund_credit,
          'total': g.amount

        };
      }),
      'statusList': item.status_list.map(g => {
        return {
          'statusName': g.status_name,
          'isTrue': g.is_true,
          'statusTime': g.status_time_formatted
        };
      }),
      'refundTo': item.payment_method_formatted,
      'refundDesc': item.refund_desc,
      'isShowSteps': item.is_show_status_map, // 是否显示退款字段
      'isShowBtn': item.is_show_cancel_button, // 是否显示修改、取消按钮
      'orderSn': item.order_sn, // 订单号
      'paystatus': item.pay_status // 无
    };
  }));
};
function guid () {
  function S4 () {
    return (((1 + Math.random()) * 0x10000) | 0).toString(16).substring(1);
  }
  return (S4() + S4() + '-' + S4() + '-' + S4() + '-' + S4() + '-' + S4() + S4() + S4());
}
// 退货详情
const getItem = async refundId => {
  let result = await apiGetItem({
    refund_id: refundId
  });
  if (result.success) {
    let data = result.data;
    result.data = {
      'orderId': data.order_id, // 1
      'orderSn': data.order_sn, // 1
      'reason': data.reason, // 1
      'goods': data.details.map(d => ({
        retireQuantity: d.quantity.toString(), // 退货数量1 组件问题需要将数值转化为字符串
        canRefundQuantity: d.can_refund_quantity, // 可退数量1
        price: d.price, // 1
        goodsName: d.goods.goods_name, // 1
        goodsImg: d.goods.goods_image, // 1
        goodsId: d.goods.goods_id // 商品ids
      }))
    };
  }
  return formatResult(result);
};
// 订单详情
const getOrderDetail = async (orderSn) => {
  let result = await apiGetOrderDetail({
    order_sn: orderSn
  });
  if (result.success) {
    let x = result.data;

    result.data = {
      orderId: x.order_id, // s
      // orderSn: x.order_sn, // s
      // orderType: x.order_type,
      // createTime: x.created_time_formatted,
      // willReceive: x.order_total,
      // realReceive: x.real_total,
      // shipStatus: x.status_formatted,
      // payMode: x.payment_method_formatted,
      // payMode: x.pay_mode_formatted,
      // payTime: x.paid_time_formatted,
      // nickName: x.customer.nickname,
      // mobile: x.customer.mobile,
      // couponDeduction: x.coupon_deduction,
      // randomDeduction: x.random_deduction,

      'goods': x.details.map(d => ({
        // goodsImg: 'https://sili-pr.oss-cn-shenzhen.aliyuncs.com/317027283796776190',
        // goodsName: '法国龙船小庄园750ml 2016年',
        // price: 1343.25,
        // quanity: 3,
        // canRefundQuantity: 3, // 可退数量
        // value: 0 // 退货数量
        goodsId: d.goods_id, // 商品id s
        quantity: d.quantity, // 商品数量s
        canRefundQuantity: d.can_refund_quantity, // 可退数量s
        price: d.price, // s
        goodsName: d.goods.goods_name, // s
        goodsImg: d.goods.goods_image, // s
        retireQuantity: '0' // s
      }))

    };
  }
  return formatResult(result);
};
const modifyItem = async (params) => {
  return formatResult(await apiModifyItem(params));
};
const addItem = async (params) => {
  return formatResult(await apiAddItem(params));
};
const cancelRefund = async (refundId) => {
  return formatResult(await apiCancelRefund({refund_id: refundId}));
};

export {
  getList,
  getItem,
  getOrderDetail,
  modifyItem,
  addItem,
  cancelRefund
};
