/**
 * 日志
 */

import apiGetItem from 'api/myBox/get-item';
import apiGetList from 'api/myBox/get-list';
import formatResult from './formatResult';
import listResultModel from './listResultModel';

const getItem = async (data) => {
  let result = await apiGetItem(data);
  if (result.success) {
    result.data.goods = result.data.items.map(x => ({
      name: x.goods_name || '',
      price: x.price,
      quantity: x.quantity || 0,
      img: x.file_image_url || '',
      goodsId: x.goods_id
    }));
  }
  return formatResult(result);
};

const getList = async data => {
  let result = await apiGetList(data);
  return formatResult(listResultModel(result, (item) => {
    return {
      boxNo: item.box_no,
      boxId: item.box_id,
      address: item.address,
      distance: item.distance ? parseFloat(item.distance).toFixed(2) : 0
    };
  }));
};

export {
  getItem,
  getList
};
