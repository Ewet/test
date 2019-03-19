import apiGetOpportunities from '@/api/lotteryActivity/get-opportunities';
import apiGetCode from '@/api/lotteryActivity/get-code';
import apiGetOpenid from '@/api/lotteryActivity/get-openid';
import apiGetLotteryResult from '@/api/lotteryActivity/get-lotteryResult';
// daigouyuan
import apiGetAgentOpportunities from '@/api/lotteryActivity/get-agentOpportunities';
import apiGetAgentLotteryResult from '@/api/lotteryActivity/get-agentLotteryResult';

// import apiGetList from '@/api/refund/get-list';
import apiGetList from '@/api/lotteryActivity/get-list';
import apiGetItem from '@/api/lotteryActivity/get-item';
// import apiGetItem from '@/api/distribution/quota';
import apiModifyItem from '@/api/lotteryActivity/modify-item';
import listResultModel from './listResultModel';
import formatResult from './formatResult';
// 查询当前正在进行中的面向消费者的抽奖活动
import apiGetCurrentActivity from 'api/lotteryActivity/get-current-activity';
// 获取当前活动的奖品列表
import apiGetCurrentActivityPrize from 'api/lotteryActivity/get-prize-list';
// 页面加载
const getLotteryNum = (data) => {
  if (data.userType === '1') {
    return getOpportunities(data.activityId);
  } else if (data.userType === '2') {
    // 代购员
    return getPurchaserOpportunities(data.activityId);
  }
};

// 普通会员获取抽奖次数
const getOpportunities = async (id) => {
  let result = await apiGetOpportunities({
    activity_id: id
  });
  if (result.success) {
    result.data = {
      isLogin: result.data['is_login'],
      hasOpenId: result.data['openid_known'],
      opportunities: result.data['opportunities'],
      rule: result.data['description'],
      endTime: result.data['end_time']
    };
  }
  return formatResult(result);
};
// 代购员获取抽奖次数
const getPurchaserOpportunities = async (id) => {
  let result = await apiGetAgentOpportunities({
    activity_id: id
  });
  if (result.success) {
    result.data = {
      'opportunities': result.data['opportunities'], // 剩余抽奖次数
      'rule': result.data['description'], // 活动描述（规则）
      'endTime': result.data['end_time'] // 活动结束时间（时间戳）
    };
  }
  return formatResult(result);
};

// getCode
const getO2Code = async data => {
  let result = await apiGetCode(data);
  return formatResult(result);
};

// 获取openid
const getOpenid = async code => {
  let result = await apiGetOpenid({
    o2_code: code
  });
  return formatResult(result);
};

// 普通会员获取抽奖结果
const getLotteryResult = async id => {
  let result = await apiGetLotteryResult({
    activity_id: id
  });
  return formatResult(result);
};

// 代购员获取抽奖结果
const getAgentLotteryResult = async id => {
  let result = await apiGetAgentLotteryResult({
    activity_id: id
  });
  return formatResult(result);
};
let getList = async (data) => {
  let result = await apiGetList(data);
  return formatResult(listResultModel(result, (item) => {
    const getIcon = (type) => {
      if (type === 1) {
        return 'cash';
      } else if (type === 2) {
        return 'prizecoupon';
      } else {
        return 'bracelet';
      }
    };
    const setStatus = (type, status, format) => {
      if (type === 3 && status === 10) {
        return '';
      } else {
        return format;
      }
    };
    return {
      prizeType: item.prize_type,
      winnerId: item.winner_id,
      icon: getIcon(item.prize_type),
      prizeName: item.prize_name,
      status: item.status,
      couponSn: item.coupon_sn,
      statusFormat: setStatus(item.prize_type, item.status, item.status_format)

      // consigneeInfo: item.consignee_info, // 是否填写资料
    };
  }));
};
let getItem = async (data) => {
  let result = await apiGetItem(data);
  if (result.success) {
    let data = result.data;
    result.data = {
      prizeType: data.prize_type, // 类型
      prizeName: data.prize_name, // 礼品名称
      couponType: data.coupon_type, // 优惠券类型
      couponValue: data.coupon_value, // 优惠券卷面价值
      amount: data.amount, // 红包卷面价值
      validityPeriod: data.duration, // 有效期
      useCondition: `满${data.using_threshold}元使用`, // 使用条件
      // 实物
      imgUrl: data.url, // 奖品图片
      wonTime: data.won_time, // 中奖时间
      status: data.status, // 状态
      statusFormat: data.status_format, // 状态
      remark: data.remark, // 备注
      consigneeInfo: data.consignee_info, // 是否填写资料
      consigneeInfoFormat: data.consignee_info_format,
      username: data.contact_name,
      mobile: data.contact_mobile,
      address: data.contact_address,
      courierCompany: '顺丰快递', // 快递公司
      trackingNumber: '111' // 快递单号
    };
  }
  return formatResult(result);
};
const modifyItem = async (params) => {
  return formatResult(await apiModifyItem(params));
};

// 获取当前正在进行的活动
const getCurrentActivity = async (data) => {
  let result = await apiGetCurrentActivity(data);
  if (result.success) {
    result.data = {
      'activityId': result.data.activity_id,
      'activityName': result.data.activity_name,
      'opportunities': result.data.opportunities
    };
  }
  return formatResult(result);
};

const getCurrentActivityPrize = async (data) => {
  let result = await apiGetCurrentActivityPrize(data);
  return formatResult(listResultModel(result, (item) => {
    return {
      value: item.amount_format,
      type: item.prize_type,
      couponType: item.coupon_type,
      couponTypeText: item.coupon_type_format,
      img: item.image_url || '',
      couponValue: item.coupon_value_format,
      name: item.prize_name
    };
  }));
};

export {
  getO2Code,
  getLotteryNum,
  getOpenid,
  getOpportunities,
  getLotteryResult,
  getAgentLotteryResult,
  getList,
  getItem,
  modifyItem,
  getCurrentActivity,
  getCurrentActivityPrize
};
