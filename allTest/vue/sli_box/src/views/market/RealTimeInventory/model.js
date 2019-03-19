import apiGetList from './api/get-list';
import apiExportList from './api/export';

import formatResult from 'model/formatResult';
import listResult from 'model/listResult';

// 补货列表
const getList = async data => formatResult(listResult(await apiGetList(data), x => ({
  name: x.name, // 商户名称
  boxNo: x.box_no, // 盒子编号
  address: x.address, // 盒子地址
  layerNo: x.layer_no, // 货区编号
  goodsName: x.goods_name, // 商品名称
  quantity: x.quantity// 库存数量
})));

const exportList = (data) => {
  apiExportList(data);
};

export {
  getList,
  exportList
};
