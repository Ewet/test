/**
 * 优惠劵模型
 */

import apiGetByOrder from '@/api/coupon/get-by-order';
import apiGetCenterList from '@/api/coupon/get-center-list';
import apiGetItemCommon from '@/api/coupon/get-item-common';
import apiGetMyList from '@/api/coupon/get-my-list';
import apiGetPersonItem from '@/api/coupon/get-person-item';
import apiReceiveItem from '@/api/coupon/receive-item';
import formatResult from './formatResult';
import formatItem from './formatItem';
import listResultModel from './listResultModel';
import fecha from 'fecha';
// 范围详情
const rangecheck = (items, type) => {
  let list = items.filter(x => x.object_type === type);
  let desc = '';
  let txt = '';
  if (list.length) {
    switch (type) {
      case '1': txt = list.filter(x => x.box && Object.keys(x.box).length).map(x => {
        if (x.box) {
          return x.box.box_no;
        }
      });
        if (list.filter(x => !x.box).length) {
          txt.push('特定');
        }
        desc = `仅限${txt.join(',')}盒子使用`; break;
      case '2': txt = list.filter(x => x.goods && Object.keys(x.goods).length).map(x => {
        if (x.goods) {
          return x.goods.goods_name;
        } else {
          return '特定';
        }
      });
        desc = `仅限${txt}商品使用`; break;
    }
    // desc = `仅限${txt}使用`;
  } else if (list.length === 0) {
    desc = '无限制';
  }
  return desc;
};
// 是否有限制
const islimit = (items) => {
  let txt = [];
  let goods = items.filter(x => x.object_type === '2');
  let box = items.filter(x => x.object_type === '1');
  if (goods.length) {
    txt.push('商品');
  }
  if (box.length) {
    txt.push('盒子');
  }
  if (!txt.length) {
    return '无限制';
  }
  return `限定${txt.join('/')}使用`;
};
// 日期格式化
const dateFormat = (date) => {
  return fecha.format(new Date(date * 1000), 'YYYY.MM.DD');
};
// 时间（个人优惠券）
const timecheck = ({
  time_control,
  duration,
  start_time,
  end_time,
  create_time,
  expiration_time
}) => {
  let v = '';
  let createTime = dateFormat(create_time);
  let expirationTime = dateFormat(expiration_time);
  if (time_control === '1') {
    let startTime = dateFormat(start_time);
    let endTime = dateFormat(end_time);
    v = startTime + '-' + endTime;
  } else if (time_control === '2') {
    if (duration === 0) {
      v = '永久有效';// 领取后0天内有效
    } else if (duration > 0) {
      v = createTime + '-' + expirationTime;
    }
  }
  return v;
};
// 说明
const descheck = (type, item) => {
  let msg = '';
  // let t = item.coupon_type;
  if (item.using_threshold === 0) {
    if (type === '1') {
      msg = '消费任意金额立减' + item.coupon_value + '元';
    } else {
      msg = '消费任意金额打' + item.coupon_value / 10 + '折';
    }
  } else {
    if (type === '1') {
      msg = '消费满' + item.using_threshold + '元立减' + item.coupon_value + '元';
    } else {
      msg = '消费满' + item.using_threshold + '元打' + item.coupon_value / 10 + '折';
    }
  }
  return msg;
};
const getListByOrder = async ({orderId, available}) => {
  let result = await apiGetByOrder({
    order_id: orderId,
    usable: available ? 1 : 0
    // 'pagination[page_size]': 1000
  });
  if (result.success) {
    let list = [];
    result.data.forEach(x => {
      let { success, data, msg } = formatItem(x, (item) => {
        return couponItem(Object.assign({}, item, item.coupon), {
          validityPeriodFormat: (data) => {
            return timecheck(data);
          }});
      });
      if (success) {
        list.push(data);
      } else {
        result.success = false;
        result.msg = msg;
      }
    });
    result.data = list;
  }
  return formatResult(result);
};
const getCenterList = async (data) => {
  let result = await apiGetCenterList(data);
  return formatResult(listResultModel(result, (item) => {
    return couponItem(item, {
      validityPeriodFormat: (data) => {
        let startTime = dateFormat(data.start_time);
        let endTime = dateFormat(data.end_time);
        let v = '';
        if (data.time_control === '1') {
          v = startTime + '-' + endTime;
        } else if (data.time_control === '2') {
          if (data.duration === 0) {
            v = '永久有效';
          } else {
            v = '领取后' + data.duration + '天内有效';
          }
        }
        return v;
      }
    });
  }));
};

const couponItem = (data, {
  validityPeriodFormat
}) => {
  return {
    'rangebox': rangecheck(data.coupon_range, '1'), // 0.5
    'rangegoods': rangecheck(data.coupon_range, '2'), // 0.5
    'range': islimit(data.coupon_range),
    'threshold': data.using_threshold === 0 ? '无金额门槛' : '满' + data.using_threshold + '元可用', // 使用门槛1
    'couponType': data.coupon_type_formatted, // 券类型1
    'cardType': data.coupon_type === '1' ? 1 : 2, // 1
    'discount': data.coupon_type === '1' ? data.coupon_value : data.coupon_value / 10, // 劵面价值1
    'descriptions': descheck(data.coupon_type, data), // 使用说明1
    'validityPeriod': validityPeriodFormat(data), // 1
    'superposable': data.superposable, // 可叠加使用
    'couponId': data.coupon_id,
    'maxCount': data.max_count,
    'instructions': data.description,
    'couponSn': data.coupon_sn,
    'couponName': data.name
  };
};

const getItemCommon = async (id) => {
  let result = await apiGetItemCommon({
    coupon_id: id
  });
  if (result.success) {
    result.data = couponItem(result.data, {
      validityPeriodFormat: (data) => {
        let startTime = dateFormat(data.start_time);
        let endTime = dateFormat(data.end_time);
        let v = '';
        if (data.time_control === '1') {
          v = startTime + '-' + endTime;
        } else if (data.time_control === '2') {
          if (data.duration === 0) {
            v = '永久有效';
          } else {
            v = '领取后' + data.duration + '天内有效';
          }
        }
        return v;
      }
    });
  }
  return formatResult(result);
};

const getMyList = async (data) => {
  let result = await apiGetMyList(data);
  return formatResult(listResultModel(result, (item) => {
    return couponItem(Object.assign({}, item, item.coupon, {
      'create_time': item.create_time,
      'create_time_formatted': item.create_time_formatted
    }), {
      validityPeriodFormat: (data) => {
        return timecheck(data);
      }
    });
  }));
};

const getPersonItem = async (couponSn) => {
  let result = await apiGetPersonItem({
    coupon_sn: couponSn
  });
  if (result.success) {
    let data = result.data;
    result.data = couponItem(Object.assign({}, data, data.coupon, {'create_time': data.create_time, 'create_time_formatted': data.create_time_formatted}), {
      validityPeriodFormat: (data) => {
        return timecheck(data);
      }
    });
  }
  return formatResult(result);
};

const receiveItem = async (couponId) => {
  let result = await apiReceiveItem({
    coupon_id: couponId
  });
  return formatResult(result);
};

// ----------------------摩萄劵----------------------

// 获取当前订单下可用的优惠劵列表
const getAvailableList = (orderId) => {
  return getListByOrder({
    orderId,
    available: true
  });
};

// 获取当前订单下不可用的优惠劵列表
const getUnavailableList = (orderId) => {
  return getListByOrder({
    orderId,
    available: false
  });
};

// ----------------------我的优惠劵----------------------

// 获取我的优惠劵中未使用的优惠劵列表
const getMyUnusedList = () => {
  return getMyList({
    is_used: 0,
    is_overdue: 0,
    'pagination[page_size]': 1000
  });
};

// 获取我的优惠劵中已使用的优惠劵列表
const getMyUsedList = () => {
  return getMyList({
    is_used: 1,
    'pagination[page_size]': 1000
  });
};

// 获取我的优惠劵中已过期的优惠劵列表
const getMyExpiredList = () => {
  return getMyList({
    is_overdue: 1,
    'pagination[page_size]': 1000
  });
};

// ----------------------优惠劵领取中心----------------------

// 获取满减优惠劵
const getFullReductionList = () => {
  return getCenterList({
    coupon_type: '1',
    'pagination[page_size]': 1000
  });
};

// 获取折扣优惠劵
const getDiscountList = () => {
  return getCenterList({
    coupon_type: '2',
    'pagination[page_size]': 1000
  });
};

// 获取全部优惠劵
const getAllList = () => {
  return getCenterList({
    coupon_type: '',
    'pagination[page_size]': 1000
  });
};
export {
  getItemCommon,
  getPersonItem,
  receiveItem,
  getAvailableList,
  getUnavailableList,
  getMyUnusedList,
  getMyUsedList,
  getMyExpiredList,
  getFullReductionList,
  getDiscountList,
  getAllList
};
