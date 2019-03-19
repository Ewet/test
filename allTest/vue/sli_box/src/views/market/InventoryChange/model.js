import apiGetList from './api/get-list';
import formatResult from 'model/formatResult';
// import formatItem from './formatItem';
import listResult from 'model/listResult';

// 库存变动列表
const getList = async data => formatResult(listResult(await apiGetList(data), x => ({
  boxNum: x.box_no,
  layerNum: x.layer_no,
  goodsName: x.goods_name,
  from: x.from,
  changeNum: Number(x.to) - Number(x.from),
  to: x.to,
  createdFormatted: x.created_formatted,
  typeFormatted: x.type_formatted,
  orderSn: x.order_sn
})));

export {
  getList
};
