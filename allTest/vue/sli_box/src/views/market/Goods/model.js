
import apiGetList from './api/get-list';
import apiGetItem from './api/get-item';
import apiAddItem from './api/add-item';
import apiDelItem from './api/del-item';
import apiUpdateItem from './api/update-item';
import apiUpdateCost from './api/update-cost';
import apiGetQrcode from './api/qr_code';
import formatResult from 'model/formatResult';
import listResult from 'model/listResult';

// 商品列表
const getList = async data => formatResult(listResult(await apiGetList(data), x => ({
  goodsId: x.goods_id,
  gcateName: x.gcate_name,
  goodsName: x.goods_name,
  barcode: x.barcode,
  cost: x.cost, // 待定
  marketPrice: x.market_price,
  suggestPrice: x.suggest_price,
  price: x.market_price
})));
const getItem = async (goodsId) => {
  const result = await apiGetItem({
    goods_id: goodsId
  });
  if (result.success) {
    const data = result.data;
    result.data = {
      goodsId: data.goods_id,
      goodsName: data.goods_name,
      gcateName: data.gcate_name,
      gcateId: data.gcate_id,
      distributorId: data.distributor_id,
      distributorName: data.distributor_name,
      barcode: data.barcode,
      cost: data.cost, // 待定
      marketPrice: data.market_price,
      suggestPrice: data.suggest_price,
      fileUrl: data.desc_file_url, // 介绍文件
      fileId: data.desc_file_id === '-1' ? '' : data.desc_file_id, // 介绍文件

      pic: data.pic.map(x => ({
        picId: x.pic_id,
        id: x.pic_id,
        url: x.pic_url,
        status: 'finished',
        name: ''
      })),
      description: data.description,
      qrCodeUrl: data.qr_code_url
    };
  }
  return formatResult(result);
};
const getQrcode = async (goodsId) => {
  const result = await apiGetQrcode({
    id: goodsId
  });
  if (result.success) {
    const data = result.data;
    // console.log(data);
    result.data = {
      goodsName: data.goods_name,
      url: data.url
    };
  }
  return formatResult(result);
};
const addItem = async params => formatResult(await apiAddItem(params));
const updateItem = async params => formatResult(await apiUpdateItem(params));
const delItem = async goodsId => formatResult(await apiDelItem({
  goods_id: goodsId
}));
const updateCost = async params => formatResult(await apiUpdateCost(params));
export {
  getList,
  getItem,
  addItem,
  updateItem,
  delItem,
  updateCost,
  getQrcode

};
