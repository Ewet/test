import apiGetList from './api/get-list';
import apiExportList from './api/export';

import formatResult from 'model/formatResult';
import listResult from 'model/listResult';

const getList = async data => formatResult(listResult(await apiGetList(data), x => ({
  merchantName: x.merchant_name, // 商户名称
  statisticalMonth: x.time, // 统计月份
  startAndStopDates: x.real_start_time_formatted + '-' + x.real_end_time_formatted, // 起止日期
  proportion: x.proportion_formatted, // 分成比例
  paidAmount: x.real_receive_formatted, // 实收金额
  guaranteedAmount: x.minimum_amount_formatted, // 保底金额
  shareAmount: x.distribution_amount_formatted, // 分成金额
  settlementBank: x.bank_name, // 结算银行
  bankAccount: x.bank_account, // 银行账号
  merchantId: x.merchant_id, // 商户ID
  id: x.id// 规则ID
})));

const exportList = async (data) => {
  apiExportList(data);
};
export {
  getList,
  exportList
};
