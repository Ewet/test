import apiLogin from 'api/member/login';
import apiLogout from 'api/member/logout';
import apiGetProfile from 'api/member/get-profile';
import apiWXLogin from 'api/member/wx-login';
import apiPostCode from 'api/member/wx-post-code';
import apiGetInviteCode from 'api/member/get-invite-code';
import formatResult from './formatResult';
import { TOKEN, SESSION_ID } from 'const/cacheKey';
import { setItem } from 'utils/cache';
import apiGetRole from 'api/member/get-role';
import apiIsLogined from 'api/member/is-logined';

let wxLogin = (data) => {
  return apiWXLogin({
    callback: data.callbackURL
  });
};
let wxPostCode = (data) => {
  return apiPostCode({
    code: data.code
  });
};

// 登陆
let login = async (data) => {
  let result = await apiLogin(data);
  if (result.success) {
    let data = result.data;
    result.data = {
      'motaoToken': data.motaoToken
    };
  }
  return result;
};

// 登出
let logout = (data) => {
  return apiLogout(data);
};

// 我的资料
var getProfile = async (data) => {
  // let key = 'sili_profile';
  // let profile = sessionStorage.getItem(key);
  // if (profile) {
  //   let result = JSON.parse(profile);
  //   if (result.success) {
  //     return result;
  //   }
  // }
  let result = await apiGetProfile(data);
  if (result.success) {
    let data = result.data;
    result.data = {
      // 'level': data.trader_type_formatted || '普通会员',
      'level': data.member_type.filter(x => x.type_key !== 1).map(x => x.type_name),
      'nickname': data.nickname,
      'credit': data.credit1,
      'mobile': data.mobile,
      'avatar': data.avatar,
      'address': data.address || '广东 中山',
      'qrcode': data.qrcode,
      'gender': data.gender_formatted,
      'genderVal': data.gender,
      'inviteCode': data.invite_code,
      'isTrader': data.is_trader === 1
    };
  }
  let temp = formatResult(result);
  // if (temp.success && temp.code === 200) {
  //   sessionStorage.setItem(key, JSON.stringify(temp));
  // }
  return temp;
};

const getInviteCode = async (data) => {
  // let key = 'sili_invite_code';
  // let code = sessionStorage.getItem(key);
  // if (code) {
  //   let result = JSON.parse(code);
  //   if (result.success) {
  //     return result;
  //   }
  // }
  let result = await apiGetInviteCode(data);
  if (result.success) {
    let data = result.data;
    result.data = {
      'nickname': data.nickname,
      'avatar': data.avatar,
      'address': data.address || '广东 中山',
      'genderVal': data.gender,
      'inviteCode': data.invite_code,
      'isTrader': data.is_trader === 1,
      'url': data.url
    };
  }
  let temp = formatResult(result);
  // if (temp.success && temp.code === 200) {
  //   sessionStorage.setItem(key, JSON.stringify(temp));
  // }
  return temp;
};

// 获取二维码
const getQrCode = async (data) => {
  let result = await getProfile();
  if (result.success) {
    let {success, data} = await apiGetInviteCode({
      'invite_code': result.data.inviteCode
    });
    if (success) {
      console.log(data);
      return [data.url, data.avatar];
    }
  }
};

// 设置token
const setToken = token => {
  setItem(TOKEN, token);
};
// 设置sessionId
const setSessionId = sessionId => {
  setItem(SESSION_ID, sessionId);
};

// 代购员获取抽奖次数
const getRole = async data => {
  let result = await apiGetRole();
  if (result.success) {
    result.data = {
      'isReplenishman': result.data.is_replenishman, // 补货员
      'isPurchasingAgent': result.data.is_purchasing_agent // 代购员
    };
  }
  return formatResult(result);
};

const isLogined = async data => {
  return formatResult(await apiIsLogined());
};

export {
  login,
  logout,
  getProfile,
  wxLogin,
  wxPostCode,
  getInviteCode,
  getQrCode,
  setToken,
  setSessionId,
  getRole,
  isLogined
};
