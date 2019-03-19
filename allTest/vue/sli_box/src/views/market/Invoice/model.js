import apiGetList from './api/get-list';
import apiGetItem from './api/get-item';
import formatResult from 'model/formatResult';
import listResult from 'model/listResult';
import apiSuccessfulTicketOpening from './api/Successful-ticket-opening';
import apiErrorfulTicketOpening from './api/refuseInvoice';

const getList = async data => formatResult(listResult(await apiGetList(data), x => ({
  invoiceTop: x.title_name,
  dutyParagraph: x.tax_number,
  invoiceNum: x.invoice_no,
  money: x.order_total,
  style: x.status_format,
  invoiceId: x.invoice_id,
  status: x.status,
  realTotal: x.real_total
})));
const getItem = async (roleId) => {
  const result = await apiGetItem({
    invoice_id: roleId
  });
  if (result.success) {
    const data = result.data;
    result.data = {
      type: data.title_type_format,
      applicationTime: data.created_time_format,
      invoiceStyle: data.status_format,
      singleNumber: data.order_sn,
      invoiceTop: data.title_name,
      receivables: data.order_total,
      cashReceipts: data.paid_total,
      titleType: data.title_type,
      taxNumber: data.tax_number,
      companyAddress: data.company_address,
      bankName: data.bank_name,
      bankAccount: data.bank_account,
      pointsDeduction: data.points_deduction,
      couponDeduction: data.coupon_deduction,
      handledTimeFormat: data.handled_time_format,
      status: data.status,
      pic: data.pic,
      items: data.goodsList.map(d => ({
        goodsName: d.goods_name,
        unitPrice: d.price,
        num: d.quantity
      }))
    };
  }
  return formatResult(result);
};
// 开票成功
const successfulTicketOpening = async (data) => {
  const result = await apiSuccessfulTicketOpening(data);
  return result;
};
// 开票失败
const errorfulTicketOpening = async (data) => {
  const result = await apiErrorfulTicketOpening(data);
  return result;
};
export {
  getList,
  getItem,
  successfulTicketOpening,
  errorfulTicketOpening
};
