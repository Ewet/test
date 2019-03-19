
import apiGetList from './api/get-list';
import apiExportReport from './api/reports';
import formatResult from 'model/formatResult';
import listResult from 'model/listResult';

// 商品列表
const getList = async data => formatResult(listResult(await apiGetList(data), x => ({
  merchantName: x.name, // 商户名称
  boxNo: x.box_no, // 盒子编号
  createdTime: x.created_time_formatted, // 下单日期
  orderSn: x.order_sn, // 订单号
  goodsName: x.goods_name, // 商品名称
  goodsNumber: x.quantity, // 商品数量
  goodsAmounts: x.goods_price, // 商品金额
  actualPayment: x.net_receipts, // 实付金额
  invoiceIssuing: x.title_name, // 开票抬头
  invoiceType: x.title_type_formatted, // 开票类型
  invoiceState: x.invoice_status, // 开票状态
  invoiceNo: x.invoice_no, // 发票号码
  invoiceTime: x.handled_time_formatted, // 开票时间
  invoiceResult: x.status !== '1' ? x.status_formatted : '', // 开票结果
  id: x.id
})));

// 导出明细
const exportReport = (params) => {
  apiExportReport(params);
};

export {
  getList,
  exportReport
};
