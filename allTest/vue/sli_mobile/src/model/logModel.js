/**
 * 日志
 */

import apiLog from '@/api/log';
import formatResult from './formatResult';

const log = async (data) => {
  let result = await apiLog(data);
  return formatResult(result);
};

export {
  log
};
