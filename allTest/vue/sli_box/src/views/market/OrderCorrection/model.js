import apiGetList from './api/get-list';
import apiGetItem from './api/get-item';
// import apiOpen from './api/open';
// import apiClose from './api/close';
import apiSwitch from './api/new_refund_payment';
import apiRetransmission from './api/retransmission';
import apiRefunding from './api/refunding';
import apiExport from './api/export';
import apiGetGoodsList from './api/get-goods-list';
import apiConfirmItem from './api/confirm-add-item';
import apiCloseBtn from './api/close-btn';

import formatResult from 'model/formatResult';
import listResult from 'model/listResult';

const getList = async data => formatResult(listResult(await apiGetList(data), x => ({
  orderSn: x.order_sn, // 订单号
  boxNo: x.box_no, // 盒子编码
  operationTime: x.op_time_formatted, // 操作时间格式化
  operationTimeBackstage: x.op_time, // 操作时间
  operationType: x.op_type_formatted, // 操作状态格式化
  operationTypeBackstage: x.op_type, // 操作状态
  money: x.amount, // 金额
  operator: x.work_name, // 操作者
  operationState: x.status_formatted, // 操作状态格式化
  operationStateBackstage: x.status, // 操作状态
  switch: x.is_enable, // 暂停收/退款
  id: x.correction_order_id
})));

const getItem = async (data) => {
  const res = await apiGetItem({
    correction_order_id: data
  });
  if (res.success) {
    const dataArr = res.data.items;
    res.data.items = dataArr.map(x => ({
      goodsName: x.goods_name, // 商品名称
      goodsBom: x.bom_code, // 商品BOM
      quantity: x.quantity, // 数量
      unitPrice: x.price, // 单价
      paid: x.actually_paid, // 实付金额
      replacement: x.remarks, // 备注
      replacementCommodity: x.tobe_goods_name, // 置换商品
      replacementUnitPrice: x.tobe_goods_price, // 置换商品单价
      amount: x.amount, // 金额
      id: x.id
    }));
  }
  return formatResult(res);
};

// 开启
// const open = async (params) => {
//   return formatResult(await apiOpen({
//     id: params
//   }));
// };

// 关闭
// const close = async (params) => {
//   return formatResult(await apiClose({
//     id: params
//   }));
// };

// 订单纠正-暂停收/退款
const switchBtn = async params => formatResult(await apiSwitch(params));
// 关闭按钮
const closeBtn = async params => formatResult(await apiCloseBtn({
  correction_order_id: params
}));

// 重发
const retransmission = async params => formatResult(await apiRetransmission(params));

// 重新退款
const refunding = async params => formatResult(await apiRefunding(params));

const exportReport = (params) => {
  apiExport(params);
};

// 新增收退款列表
const getGoodsList = async (orderSn) => {
  const result = await apiGetGoodsList({
    order_sn: orderSn
  });
  if (result.success) {
    const data = result.data;
    result.data = data.map(x => ({
      goodsName: x.goods_name,
      goodsBom: x.bom_code,
      num: x.quantity,
      money: x.price,
      realMoney: x.amount,
      changeGoods: '',
      changeGoodsPrice: null,
      changeGoodsId: null,
      amountMoney: null,
      remarks: '',
      detailId: x.detail_id,
      orderId: x.order_id
    }));
  }
  return formatResult(result);
};

// 新增退收款确定
const confirmItem = async (data) => {
  const result = await apiConfirmItem(data);
  return formatResult(result);
};

export {
  getList,
  getItem,
  switchBtn,
  retransmission,
  refunding,
  exportReport,
  getGoodsList,
  confirmItem,
  closeBtn
};
