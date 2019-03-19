import apiGetList from './api/get-list';
import apiGetOrderDetail from './api/sn-info';
import apiGetNoteList from './api/get-note-list';
import apiAddNote from './api/add-note';
import apiSendNotify from './api/send-notify';
import apiGetCargoArea from './api/get-cargoArea';
import apiSubmitOrder from './api/submit-order';

import formatResult from 'model/formatResult';
// import formatItem from './formatItem';
import listResult from 'model/listResult';

// 订单列表
const getList = async data => formatResult(listResult(await apiGetList(data), x => ({
  name: x.merchantName,
  boxNum: x.box_no,
  orderNum: x.order_sn,
  orderTime: x.created_time_formatted,
  orderTyle: x.order_type_format,
  orderTotal: x.order_total,
  orderStyle: x.status_format,
  status: x.status,
  orderId: x.order_id
})));
// 订单详情
const getOrderDetail = async (orderSn) => {
  const result = await apiGetOrderDetail({
    order_sn: orderSn
  });
  if (result.success) {
    const x = result.data;
    let userId = parseInt(x.user_id);
    if (isNaN(userId)) {
      userId = -1;
    }
    result.data = {
      orderId: x.order_id,
      orderSn: x.order_sn,
      orderType: x.order_type,
      createTime: x.created_time_formatted,
      willReceive: x.order_total,
      realReceive: x.real_total,
      shipStatus: x.status_formatted,
      payMode: x.payment_method_formatted,
      // payMode: x.pay_mode_formatted,
      payTime: x.paid_time_formatted,
      nickName: x.customer.nickname,
      mobile: x.customer.mobile,
      couponDeduction: x.coupon_deduction,
      randomDeduction: x.random_deduction,
      goods: x.details.map(d => ({
        quantity: d.quantity,
        price: d.price,
        goodsName: d.goods.goods_name
      })),
      merchantName: x.merchant.name,
      merchantAddress: x.merchant.address,
      boxNo: x.box.box_no,
      boxAddress: x.box.address,
      purchasingName: x.purchasing.name,
      purchasingMobile: x.purchasing.mobile,
      userId,
      status: x.status,
      noteData: x.notes.map(g => ({
        id: g.note_id,
        name: g.work_name,
        date: g.created_time_formated,
        content: g.note
      }))
    };
  }
  return formatResult(result);
};

// 订单列表
const getNoteList = async data => formatResult(listResult(await apiGetNoteList(data), x => ({
  id: x.note_id,
  content: x.note,
  createTime: x.created_time_formated,
  author: x.work_name,
  orderId: x.order_id
})));

// 订单详情
const addNote = async params => formatResult(await apiAddNote(params));

// 发送订单催款通知
const sendNotify = async params => formatResult(await apiSendNotify(params));

const getGoodsDetail = () => Promise.resolve(true);

const getItem = () => Promise.resolve(true);
// 获取货区
const getCargoArea = async (params) => {
  const result = await apiGetCargoArea({
    box_id: params
  });
  if (result.success) {
    result.data = result.data.map(x => ({
      layerId: x.layer_id,
      layerNo: x.layer_no,
      goodsName: x.goods_name,
      price: x.price
    }));
  }
  return formatResult(result);
};
// 提交补充订单
const submitOrder = async params => formatResult(await apiSubmitOrder(params));

export {
  getList,
  getOrderDetail,
  getNoteList,
  addNote,
  sendNotify,
  getGoodsDetail,
  getItem,
  getCargoArea,
  submitOrder
};
