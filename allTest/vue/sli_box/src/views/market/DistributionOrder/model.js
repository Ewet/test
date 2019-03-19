import apiGetList from './api/get-list';
import apiGetItem from './api/get-item';
import listResult from 'model/listResult';
import formatResult from 'model/formatResult';
import formatItem from 'model/formatItem';

const getList = async data => formatResult(listResult(await apiGetList(data), x => ({
  // 单号
  orderSn: x.order_sn,
  // 订单金额
  withdrawalAmount: x.commission,
  // 实付
  realPay: x.real_pay,
  // 会员号
  mobile: x.user.mobile,
  // 物流状态
  shipStatus: x.ship_status_formatted,
  // 创建时间
  createTime: x.create_time_formatted,
  // 完成时间
  finishTime: x.settlement_time_formatted,
  id: x.id
})));

const getItem = async (orderId) => {
  const result = await apiGetItem({
    id: orderId
  });
  if (result.success) {
    const { success, data, msg } = formatItem(result.data, data => ({
      createTime: data.create_time_formatted,
      shipStatus: data.ship_status_formatted,
      orderTotal: data.order_total,
      finishedTime: data.settlement_time_formatted,
      user: data.user.mobile,
      commission: data.commission
    }));
    if (success) {
      result.data = data;
    } else {
      result.success = false;
      result.msg = msg;
    }
  }
  return formatResult(result);
};
export {
  getList,
  getItem
};
