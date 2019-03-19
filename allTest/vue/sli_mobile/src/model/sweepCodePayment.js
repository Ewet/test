import getFileUrl from 'api/api';
import formatResult from './formatResult';

const getQrimg = async orderId => {
  let result = await getFileUrl({
    order_id: orderId
  });
  return formatResult(result);
};

export {
  getQrimg
};
