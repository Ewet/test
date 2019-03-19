
import apiGetList from './api/stock_up-list';
import apiGetExcel from './api/stock_up-excel';
import formatResult from 'model/formatResult';
import listResult from 'model/listResult';

// 备货列表
const getList = async data => formatResult(listResult(await apiGetList(data), x => ({
  boxNo: x.box_no,
  layerNo: x.layer_no,
  goodsName: x.goods_name,
  numberOfCells: x.number_of_cells,
  quantity: x.quantity,
  planQuantity: x.plan_quantity
})));
const getExcel = (data) => {
  apiGetExcel(data);
};
export {
  getList,
  getExcel
};
