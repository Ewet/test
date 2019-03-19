import apiLogin from 'api/user/login';
import apiLogout from 'api/user/logout';
import apiGetCurrentLander from 'api/user/get-current-lander';
import apiResetPassword from 'api/user/reset-password';
import formatResult from 'model/formatResult';
import { setMenu } from 'utils/apiCache';

const login = async (params) => {
  setMenu(null);
  return formatResult(await apiLogin(params));
};

const logout = async (params) => {
  setMenu(null);
  return formatResult(await apiLogout(params));
};

const getCurrentLander = async params => formatResult(await apiGetCurrentLander(params));
const resetPassword = async (params) => {
  setMenu(null);
  return formatResult(await apiResetPassword(params));
};
export {
  login,
  logout,
  getCurrentLander,
  resetPassword
};
