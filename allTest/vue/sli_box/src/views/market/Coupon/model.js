import apiGetList from './api/get-list';
import apiUpdateItem from './api/update-item';
import apiDelItem from './api/del-item';
import apiPublishItem from './api/publish-item';
import formatResult from 'model/formatResult';
import listResult from 'model/listResult';
import apiSaveBasic from './api/save-basic';
import apiSaveInstruction from './api/save-instruction';
import apiSaveReceive from './api/save-receive';
import apiSaveRestriction from './api/save-restriction';
import apiGetBasic from './api/get-basic';
import apiGetInstruction from './api/get-instruction';
import apiGetReceive from './api/get-receive';
import apiGetRestriction from './api/get-restriction';
import fecha from 'fecha';

const getEffectiveTime = (data) => {
  let effectiveTime = '';
  // 固定时间
  if (data.time_control === '1') {
    const startTime = fecha.format(new Date(data.start_time * 1000), 'YYYY-MM-DD');
    const endTime = fecha.format(new Date(data.end_time * 1000), 'YYYY-MM-DD');
    effectiveTime = `${startTime}-${endTime}`;
  } else if (data.time_control === '2') {
    if (data.duration > 0) {
      effectiveTime = `自领取${data.duration}天后过期`;
    } else {
      effectiveTime = '永不过期';
    }
  }
  return effectiveTime;
};

const getList = async data => formatResult(listResult(await apiGetList(data), (x) => {
  const effectiveTime = getEffectiveTime(x);
  return {
    sort: x.sort,
    couponName: x.name,
    condition: x.using_threshold === 0 ? '不限' : `满${x.using_threshold}使用`,
    discount: x.coupon_type === '1' ? `立减 ${x.coupon_value} 元` : `打 ${(x.coupon_value / 10).toFixed(1)} 折`,
    remainingAmount: x.max_count > 0 ? `每人限领${x.max_count}张` : '无限',
    collectionCenter: x.coupon_center_visible === '1' ? '显示' : '不显示',
    createTime: x.create_time_formatted,
    effectiveTime,
    id: x.coupon_id,
    publishStatus: x.publish_status,
    publishStatusText: x.publish_status_formatted
  };
}));

const getItem = async (id) => {
  const basicResult = await getBasic(id);
  const receiveResult = await getReceive(id);
  const restrictionResult = await getRestriction(id);
  const instructionResult = await getInstruction(id);
  const results = [basicResult, receiveResult, restrictionResult, instructionResult];
  if (results.some(x => x.code === 402)) {
    console.log('402');
    return {
      code: 402,
      msg: results.filter(x => x.code === 402)[0].msg,
      success: false
    };
  }
  const data = {};
  data.basic = basicResult.success ? basicResult.data : {};
  data.receive = receiveResult.success ? receiveResult.data : {};
  data.restriction = restrictionResult.success ? restrictionResult.data : {};
  data.instruction = instructionResult.success ? instructionResult.data : {};
  instructionResult.data = data;
  return instructionResult;
};

const updateItem = async (data) => {
  const result = await apiUpdateItem(data);
  return formatResult(result);
};

const delItem = async (id) => {
  const result = await apiDelItem({
    coupon_id: id
  });
  return formatResult(result);
};

const publishItem = async (id) => {
  const result = await apiPublishItem({
    coupon_id: id,
    mode: 1
  });
  return formatResult(result);
};

const stopPublishItem = async (id) => {
  const result = await apiPublishItem({
    coupon_id: id,
    mode: 2
  });
  return formatResult(result);
};

// 获取基本信息
const getBasic = async (couponId) => {
  const result = await apiGetBasic({
    coupon_id: couponId
  });
  if (result.success) {
    const data = result.data;
    const temp = {
      sort: data.sort,
      couponName: data.name,
      condition: data.using_threshold,
      conditionFormatted: data.using_threshold === 0 ? '不限' : `满${data.using_threshold}使用`,
      timeControl: data.time_control,
      timeControlFormatted: data.time_control_formatted,
      startTime: data.start_time_formatted,
      endTime: data.start_time_formatted,
      duration: data.duration,
      couponType: data.coupon_type,
      couponTypeFormatted: data.coupon_type_formatted,
      couponValue: data.coupon_value,
      stock: data.stock,
      maxCount: data.max_count,
      superposable: data.superposable,
      superposableFormatted: data.superposable_formatted,
      effectiveTime: getEffectiveTime(data)
    };
    result.data = temp;
  }
  return formatResult(result);
};
// 获取领取设置
const getReceive = async (couponId) => {
  const result = await apiGetReceive({
    coupon_id: couponId
  });
  if (result.success) {
    const data = result.data;
    const temp = {
      attachable: data.attachable,
      attachableFormatted: data.attachable_formatted,
      couponCenterVisible: data.coupon_center_visible,
      couponCenterVisibleFormatted: data.coupon_center_visible_formatted
    };
    result.data = temp;
  }
  return formatResult(result);
};
// 获取使用限制
const getRestriction = async (couponId) => {
  const result = await apiGetRestriction({
    coupon_id: couponId
  });
  if (result.success) {
    const data = result.data;
    const temp = {
      goodsIdSet: data.goods ? data.goods.map(x => x.barcode) : [],
      boxIdSet: data.box ? data.box.map(x => x.box_id) : []
    };
    result.data = temp;
  }
  return formatResult(result);
};
// 获取使用说明
const getInstruction = async (couponId) => {
  const result = await apiGetInstruction({
    coupon_id: couponId
  });
  if (result.success) {
    const data = result.data;
    const temp = {
      isUddi: data.is_uddi,
      description: data.description,
      isUddiFormatted: data.is_uddi_formatted
    };
    result.data = temp;
  }
  return formatResult(result);
};

// 保存基本信息
const saveBasic = async (data) => {
  const result = await apiSaveBasic(data);
  if (result.success) {
    result.data = {
      couponId: result.data
    };
  }
  return formatResult(result);
};
// 保存领取设置
const saveReceive = async (data) => {
  const result = await apiSaveReceive(data);
  return formatResult(result);
};
// 保存使用限制
const saveRestriction = async (data) => {
  const result = await apiSaveRestriction(data);
  return formatResult(result);
};
// 保存使用说明
const saveInstruction = async (data) => {
  const result = await apiSaveInstruction(data);
  return formatResult(result);
};

export {
  getList,
  updateItem,
  delItem,
  getItem,
  saveBasic,
  saveReceive,
  saveInstruction,
  saveRestriction,
  getBasic,
  getReceive,
  getInstruction,
  getRestriction,
  publishItem,
  stopPublishItem
};
