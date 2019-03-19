import apiWithdrawCash from '@/api/distribution/withdraw-cash';
import formatResult from './formatResult';

let submitWithdraw = async (data) => {
  return formatResult(await apiWithdrawCash(data));
};
export {
  submitWithdraw
};
