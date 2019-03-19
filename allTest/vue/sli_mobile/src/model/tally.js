import apiGetList from '@/api/tally/get-list';
import apiArrangeSubmit from '@/api/tally/arrange-submit';
// import listResultModel from './listResultModel';
import formatResult from './formatResult';
// 获取列表
const getList = async (data) => {
  let result = await apiGetList(data);
  if (result.success) {
    let data = result.data;
    result.data = data.map(item => {
      return {
        'position': item.layer_no, // 货区编号
        'price': item.price, // 商品价格
        'name': item.goods_name, // 商品名称
        'imageUrl': item.goods_image, // 商品图片
        'current': item.current, // 当前商品数量
        'canPut': item.number_of_cells, // 货位数量,可放数量
        'cloud': item.quantity, // 云端商品库存数量
        'id': item.layer_id // 货区ID
      };
    });
  }
  return formatResult(result);
};

// 理货完毕
const arrangeSubmit = async (params) => {
  return formatResult(await apiArrangeSubmit(params));
};

export {
  getList,
  arrangeSubmit
};
