import apiGetList from './api/get-list';
import apiGetItem from './api/get-item';
import apiAddPlan from './api/add-plan';
import apiCancelPlan from './api/cancel-plan';
import apiGetSalesPlanQr from './api/get-qr';

import formatResult from 'model/formatResult';
// import formatItem from './formatItem';
import listResult from 'model/listResult';

const getItem = async (id) => {
  const result = await apiGetItem({
    plan_id: id
  });
  if (result.success) {
    const data = result.data;
    result.data = {
      shelfNo: data.shelf_no,
      layerNo: data.layer_no,
      layerGoodsName: data.layer_goods_name,
      quantity: data.quantity,
      layerPriceFormat: data.layer_price_format,
      createdTimeFormat: data.created_time_format,
      planTypeFormat: data.plan_type_format,
      plannedTimeFormat: data.planned_time_format,
      planGoodsName: data.plan_goods_name,
      planPriceFormat: data.plan_price_format,
      statusFormat: data.status_format
    };
  }
  return formatResult(result);
};
// 列表
const getList = async data => formatResult(listResult(await apiGetList(data), x => ({
  planId: x.plan_id,
  areaNo: x.layer_no,
  saleShop: x.goods_name,
  stock: x.stock,
  price: x.price,
  planing: x.plan_type_formatted,
  style: x.plan_status_formatted,
  boxNum: x.box_no,
  status: x.status,
  layerId: x.layer_id,
  goodsId: x.goods_id
})));
const addPlans = async (data) => {
  const result = await apiAddPlan(data);
  return result;
};

const cancelPlans = async (data) => {
  const result = await apiCancelPlan(data);
  return result;
};

const getSalesPlanQr = async (goodsId) => {
  const result = await apiGetSalesPlanQr({
    goods_id: goodsId
  });
  return result;
};

export {
  getList,
  getItem,
  addPlans,
  cancelPlans,
  getSalesPlanQr
};
