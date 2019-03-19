/**
 * 商品详情
 */

import apiGetItem from '@/api/goods/get-item';
import apiGetList from '@/api/goods/get-list';
import formatResult from './formatResult';

const getItem = async data => {
  let result = await apiGetItem(data);
  if (result.success) {
    let data = result.data;
    result.data = {
      'name': data.goods_name,
      'id': data.goods_id,
      'content': data.description,
      'images': data.images,
      'video': data.desc_file_url,
      'mediaType': data.media_type
    };
  }
  return formatResult(result);
};

const getDesc = async (goodsId) => {
  let result = await apiGetItem({
    goodsId
  });
  return formatResult(result);
};

const getList = async data => {
  let result = await apiGetList(data);
  if (result.success) {
    let data = result.data;
    result.data = data.items.map(item => {
      return {
        'name': item.goods_name,
        'id': item.goods_id,
        'desc': item.description,
        'img': item.goods_image,
        'video': item.desc_file_url,
        'quantity': item.quantity,
        'price': item.price,
        'mediaType': item.media_type
      };
    });
  }
  return formatResult(result);
};

export {
  getItem,
  getDesc,
  getList
};
