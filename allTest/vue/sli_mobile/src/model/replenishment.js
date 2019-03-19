import apiGetList from '@/api/replenishment/get-list';
import apiReplenishmentSubmit from '@/api/replenishment/replenishment-submit';
import apiExceptions from '@/api/tally/exceptions';

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
        'goodsId': item.goods_id, // 商品Id
        'imageUrl': item.goods_image, // 商品图片
        'imageUrlId': item.file_id, // 商品图片Id
        'current': item.current, // 当前商品数量
        'canPut': item.number_of_cells, // 货位数量,可放数量
        'cloud': item.quantity, // 云端商品库存数量
        'planType': item.plan_type, // 计划类型 1上新,2调价,3下架
        'operation': '', // 0操作成功,1未到计划时间
        'id': item.layer_id // 货区ID
      };
    });
  }
  return formatResult(result);
};

// 补货完毕
const replenishmentSubmit = async (params) => {
  return formatResult(await apiReplenishmentSubmit(params));
};

// 补货-异常提交
const submitExceptions = async (params) => {
  return formatResult(await apiExceptions(params));
};

export {
  getList,
  replenishmentSubmit,
  submitExceptions
};
