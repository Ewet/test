import apiGetList from './api/get-list';
import apiGetCouponList from './api/get-coupon-list';
import apiGetItem from './api/get-item';
import apiAddItem from './api/add-item';
import apiDelItem from './api/del-item';
import apiUpdateItem from './api/update-item';

import formatResult from 'model/formatResult';
// import listResult from './listResult';

// 奖品列表
const getList = async (data) => {
  const result = await apiGetList(data);
  if (result.success) {
    const data = result.data;
    result.data = data.map(x => ({
      prizeId: x.prize_id, // 奖品id
      activityId: x.activity_id, // 活动id
      prizeType: x.prize_type, // 奖品类型
      prizeTypeformatted: x.prize_type_formatted, // 奖品类型
      prizeName: x.prize_name, // 奖品名称
      prizeOrder: x.prize_order, // 奖品排序
      prizeImgUrl: x.prize_image_url, // 奖品图片url
      prizeQuantity: x.quantity // 奖品数量
    }));
    return formatResult(result);
  }
};
// 优惠券列表
const getCouponList = async (data) => {
  const result = await apiGetCouponList(data);
  if (result.success) {
    const data = result.data;
    result.data = data.map(x => ({
      // 'couponId': 'x.coupon_id', // 优惠券id
      // 'name': 'x.name' // 优惠券名称
      couponId: x.coupon_id, // 优惠券id
      name: x.name // 优惠券名称
    }));
    return formatResult(result);
  }
};

// 奖品详情
const getItem = async (prizeId) => {
  const result = await apiGetItem({
    prize_id: prizeId
  });
  if (result.success) {
    const data = result.data;
    result.data = {
      // 'prizeId': data.prize_id, // 奖品id
      activityId: data.activity_id, // 活动id
      prizeType: data.prize_type, // 奖品类型
      prizeTypeformatted: data.prize_type_formatted, // 奖品类型
      prizeName: data.prize_name, // 奖品名称
      prizeOrder: data.prize_order, // 奖品排序
      couponType: data.coupon_id, // 优惠券id
      prizeImgUrl: data.image_url, // 奖品图片url
      imageId: data.image_id, // 奖品图片id
      amount: data.amount, // 奖品金额
      amountFormatted: data.amount_formatted, // 奖品金额
      prizeQuantity: data.quantity // 奖品数量
    };
  }
  return formatResult(result);
};
const addItem = async params => formatResult(await apiAddItem(params));
const updateItem = async params => formatResult(await apiUpdateItem(params));
const delPrizeItem = async id => formatResult(await apiDelItem({
  prize_id: id
}));

export {
  getList,
  getCouponList,
  getItem,
  addItem,
  updateItem,
  delPrizeItem
};
