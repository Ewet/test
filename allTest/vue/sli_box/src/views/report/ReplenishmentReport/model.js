import apiGetList from './api/replenishment-list';
import apiGetExcel from './api/replenishment-excel';
import formatResult from 'model/formatResult';
import listResult from 'model/listResult';

// 补货列表
const getList = async data => formatResult(listResult(await apiGetList(data), x => ({
  createdTime: x.created_formatted,
  name: x.name,
  boxNo: x.box_no,
  layerNo: x.layer_no,
  detailType: x.detail_type_formatted,
  goodsName: x.goods_name,
  numberOfCells: x.number_of_cells,
  oldQuantity: x.old_quantity,
  replenishmentQuantity: x.replenishment_quantity,
  newQuantity: x.new_quantity
})));
const getExcel = (data) => {
  apiGetExcel(data);
};
export {
  getList,
  getExcel
};
