import apiGetsign from '@/api/wx/get-sign';
import apiGetWxO2Redirect from '@/api/wx/get-wxo2redirect';
import formatResult from './formatResult';
const getSign = async data => {
  let result = await apiGetsign(data);
  return formatResult(result);
};
const getO2Redirect = async data => {
  let result = await apiGetWxO2Redirect(data);
  return formatResult(result);
};

export {
  getSign,
  getO2Redirect
};
