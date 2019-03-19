import apiGetList from './api/get-list';
import apiExportOrder from './api/export-order';
import apiExportMerchant from './api/export-merchant';

import formatResult from 'model/formatResult';
import listResult from 'model/listResult';

const getList = async data => formatResult(listResult(await apiGetList(data), x => ({
  merchant: x.name,
  boxNum: x.box_no,
  orderNum: x.order_sn,
  maney: x.order_total,
  netReceipts: x.real_total,
  orderDate: x.created_time_formatted,
  paymentTime: x.grant_time_formatted,
  issueCommission: x.amount,
  commissionRatio: x.percentage,
  memberCommissions: x.member,
  buyingCommission: x.hotboom,
  shareholderCommission: x.shareholders,
  activityAward: x.events
})));

const ExportOrder = async (data) => {
  apiExportOrder(data);
};

const ExportMerchant = async (data) => {
  apiExportMerchant(data);
};
export {
  getList,
  ExportOrder,
  ExportMerchant
};
