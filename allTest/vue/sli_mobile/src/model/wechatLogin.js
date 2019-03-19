import apiSignin from 'api/wechatLogin/signin';
import apiRegisterPhone from 'api/wechatLogin/register-phone';
import apiSendCode from 'api/wechatLogin/send-code';
import formatResult from './formatResult';

const signin = async data => {
  let result = await apiSignin(data);
  return formatResult(result);
};

const registerPhone = async data => {
  let result = await apiRegisterPhone(data);
  return formatResult(result);
};

const sendCode = async data => {
  let result = await apiSendCode(data);
  return formatResult(result);
};
export {
  signin,
  registerPhone,
  sendCode
};
