import apiGetList from './api/get-list';
import apiGetItem from './api/get-item';
// import apiAddItem from './api/add-item';
// import apiDelItem from './api/del-item';
import apiUpdateItem from './api/update-item';
import apiExportTable from './api/export';
import apiAddressPrompt from './api/address_prompt';

import formatResult from 'model/formatResult';
import listResult from 'model/listResult';

// 中奖纪录列表
const getList = async data => formatResult(listResult(await apiGetList(data), x => ({
  activityName: x.activity_name, // 活动名称
  activityId: x.activity_id, // 活动id
  remark: x.remark, // 备注
  winnerId: x.winner_id, //
  contactAddress: x.contact_address, // 联系地址
  contactName: x.contact_name, // 联系人名称
  openid: x.openid, //
  prizeType: x.prize_type, // 奖品类型
  prizeTypeFormat: x.prize_type_format,
  prizeName: x.prize_name, // 奖品名称
  realname: x.nickname, // 用户名称
  wonTime: x.won_time, // 中奖时间
  wonTimeFromat: x.won_time_format,
  prizeId: x.prize_id, // 奖品id
  userId: x.user_id, // 用户id
  contactMobile: x.contact_mobile, // 联系方式
  orderSn: x.order_sn, // 订单号
  orderId: x.order_id, // 订单id
  // 'orderId': '12121212', // 订单id
  fullSevenDays: x.fullSevenDays, // 是否满7天
  payStatus: x.pay_status, // 订单状态
  payStatusFormat: x.pay_status_format, // 订单状态
  redemptionMsg: (x.prize_type === 3 && x.cashingInformation) ? `${x.contact_name}，${x.contact_address}，${x.contact_mobile}` : '', // 兑奖信息
  status: x.status, // 发放状态
  statusFormat: x.status_format,
  cashingInformation: x.cashingInformation // 是否有填写兑奖信息

})));

// 查看备注
const getItem = async (winnerId) => {
  const result = await apiGetItem({
    winner_id: winnerId
  });
  if (result.success) {
    const data = result.data;
    result.data = {
      remark: data.remark // 备注
    };
  }
  return formatResult(result);
};
// const addItem = async (params) => {
//   return formatResult(await apiAddItem(params));
// };
const updateItem = async params => formatResult(await apiUpdateItem(params));
// const delItem = async (id) => {
//   return formatResult(await apiDelItem({
//     activity_id: id
//   }));
// };
const addressPrompt = async id => formatResult(await apiAddressPrompt({
  winner_id: id
}));

const exportTable = (params) => {
  apiExportTable(params);
};
export {
  getList,
  getItem,
  // addItem,
  updateItem,
  exportTable,
  // delItem
  // delItem,
  addressPrompt
};
