import apiGetList from './api/sale-list';
import apiEXOperationDetail from './api/export_operation_detail';
import apiEXDetail from './api/export_detail';
import apiSaleExportList from './api/export';

import formatResult from 'model/formatResult';
import listResult from 'model/listResult';
// 销售列表
const getList = async data => formatResult(listResult(await apiGetList(data), x => ({
  goodsName: x.goods_name,
  barcode: x.bom_code,
  price: x.price,
  quantity: x.quantity,
  creatTime: x.creatTime,
  paitTime: x.paitTime,
  receivableAmount: x.receivable_amount,
  receivedAmount: x.received_amount,
  goodsId: x.goods_id,
  boxNum: x.box_no
}), (data) => {
  const totalQuantity = data.total_quantity;
  const totalReceivableAmount = data.total_receivable_amount;
  const totalReceivedAmount = data.total_received_amount;
  return {
    totalQuantity,
    totalReceivableAmount,
    totalReceivedAmount
  };
}));
// 导出
const saleExportList = async data => {
  apiSaleExportList(data);
};
// 导出明细-全局
const EXDetail = async data => {
  apiEXDetail(data);
};
// 操作列导出明细-全局
const EXOperationDetail = async data => {
  apiEXOperationDetail(data);
};

export {
  getList,
  saleExportList,
  EXDetail,
  EXOperationDetail
};
