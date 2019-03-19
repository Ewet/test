import apiGetList from '@/api/invoice/get-list';
import apiApplyInvoice from '@/api/invoice/apply-invoice';
// import apiGetItem from '@/api/invoice/get-item';
import apiGetOrderDetail from '@/api/order/sn-info';
import apiGetTitleList from '@/api/invoice/get-title-list';
import apiGetItem from '@/api/invoice/get-item';
import apiGetTitleItem from '@/api/invoice/get-title-item';
import apiModifyItem from '@/api/invoice/modify-item';
import apiAddItem from '@/api/invoice/add-item';
import apiDelItem from '@/api/invoice/del-item';
import listResultModel from './listResultModel';
import formatResult from './formatResult';
// 获取发票列表
let getList = async (data) => {
  let result = await apiGetList(data);
  return formatResult(listResultModel(result, (item) => {
    return {
      'invoiceId': item.invoice_id,
      'titleType': item.title_type,
      'titleTypeFormat': item.title_type_format,
      'titleName': item.title_name,
      'createdTime': item.created_time_format,
      'orderTotal': item.order_total,
      'realTotal': item.real_total,
      'status': item.status,
      'statusFormat': item.status_format
    };
  }));
};
// 发票详情
const getItem = async invoiceId => {
  let result = await apiGetItem({
    invoice_id: invoiceId
  });
  if (result.success) {
    let data = result.data;
    result.data = {
      invoiceId: data.invoice_id, // 发票ID
      titleTypeFormatted: data.title_type_format, // 发票类型
      titleName: data.title_name, // 发票抬头
      createdTimeFormatted: data.created_time_format, // 申请时间
      status: data.status, // 开票状态
      statusFormatted: data.status_format, // 开票状态
      orderSn: data.order_sn, // 关联订单号
      invoiceNo: data.invoice_no, // 发票号码
      handledTimeFormatted: data.handled_time_format, // 开票时间
      orderTotal: data.order_total, // 应收
      paidTotal: data.paid_total, // 实收
      invoiceUrl: data.pic, // 查看发票
      goodsList: data.goodsList.map(d => ({
        quantity: d.quantity,
        price: d.price,
        goodsName: d.goods_name,
        goodsTotalPrice: d.goods_total_price
      }))
    };
  };
  return formatResult(result);
};
// 发票抬头列表
let getTitleList = async (data) => {
  let result = await apiGetTitleList(data);
  return formatResult(listResultModel(result, (item) => {
    return {
      'titleId': item.title_id,
      'titleName': item.name
    };
  }));
};

// 发票抬头详情
const getTitleItem = async titleId => {
  let result = await apiGetTitleItem({
    title_id: titleId
  });
  if (result.success) {
    let data = result.data;
    result.data = {
      type: data.type,
      typeFormat: data.type_format,
      titleName: data.name,
      taxNum: data.tax_number,
      companyAddress: data.company_address,
      phone: data.phone,
      bankName: data.bank_name,
      bankAccount: data.bank_account
    };
  };
  return formatResult(result);
};
// 订单详情
const getOrderDetail = async (orderSn) => {
  let result = await apiGetOrderDetail({
    order_sn: orderSn
  });
  if (result.success) {
    let x = result.data;

    result.data = {
      orderId: x.order_id,
      orderSn: x.order_sn, // 对应单号
      realReceive: x.real_total, // 发票金额=实收金额
      goods: x.details
        .filter(y => y.can_refund_quantity)
        .map(d => ({
          goodsId: d.goods_id,
          // quantity: d.quantity, // 商品數量
          quantity: d.can_refund_quantity, // 可退數量
          price: d.price,
          amount: d.goods_total_price,
          goodsName: d.goods.goods_name
        }))

    };
  }
  return formatResult(result);
};
// 申请发票
const applyInvoice = async (params) => {
  return formatResult(await apiApplyInvoice(params));
};
// 发票抬头增删改
const modifyItem = async (params) => {
  return formatResult(await apiModifyItem(params));
};
const addItem = async (params) => {
  return formatResult(await apiAddItem(params));
};
const delItem = async (titleId) => {
  return formatResult(await apiDelItem({title_id: titleId}));
};

export {
  getList,
  applyInvoice,
  getTitleList,
  getTitleItem,
  getItem,
  getOrderDetail,
  modifyItem,
  addItem,
  delItem
};
