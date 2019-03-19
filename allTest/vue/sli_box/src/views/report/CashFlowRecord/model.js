/**
 * 提现模型
 */

import apiGetList from './api/get-list';
import formatResult from 'model/formatResult';
import listResult from 'model/listResult';
import apiExportList from './api/export-list';

const getList = async data => formatResult(listResult(await apiGetList(data), x => ({
  date: x.create_time_formatted,
  memeberId: x.user_id,
  memberName: x.nickname,
  // 'traderType': x.trader_type,
  traderTypeFormatted: x.type.map(g => g.type_name).join('、'),
  // 'traderTypeFormatted': x.trader_type_formatted,
  merchantName: x.merchant_name,
  boxNo: x.box_no,
  mobile: x.mobile,
  orderSn: x.order_sn,
  desc: x.record_description,
  amount: x.amount,
  quantity: x.quantity,
  rebateRatio: x.commission_rate,
  type: x.type_status_formatted,
  orderAmount: x.order_total,
  productName: x.goods_name
})));

const exportList = (data) => {
  apiExportList(data);
};

export {
  getList,
  exportList
};
