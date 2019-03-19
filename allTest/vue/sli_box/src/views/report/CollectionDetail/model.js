import apiGetList from './api/list';
import apiGetAmount from './api/get-amount';
import apigetExcel from './api/get-excel';

import formatResult from 'model/formatResult';
import listResult from 'model/listResult';

const getList = async data => formatResult(listResult(await apiGetList(data), x => ({
  merchantName: x.name,
  payTime: x.pay_time_formatted,
  boxNo: x.box_no,
  orderAmount: x.order_total,
  paidAmount: x.net_receipts,
  costAmount: x.amounttocost,
  grossProfitAmount: x.maori,
  grossProfitMargin: x.gross_margin
}), (data) => {
  const totalAmountOrders = data.order_total_sum;
  const totalAmountReceived = data.net_receipts_sum;
  const totalCost = data.amounttocost_sum;
  const grossGrossProfit = data.maori_sum;
  const grossMargin = data.gross_margin_sum;
  return {
    totalAmountOrders,
    totalAmountReceived,
    totalCost,
    grossGrossProfit,
    grossMargin
  };
}));
// 总额
const getAmount = async () => formatResult(await apiGetAmount());
// 导出
const getExcel = (data) => {
  apigetExcel(data);
};
export {
  getList,
  getAmount,
  getExcel
};
