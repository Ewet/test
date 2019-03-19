import apiGetPrice from '@/api/wx/get-vip-price';
import formatResult from './formatResult';
const getPrice = async (typeKey) => {
  let result = await apiGetPrice({
    type_key: typeKey
  });
  if (result.success) {
    let data = result.data;
    result.data = {
      'vipPrice': data.threshold
    };
  }
  let temp = formatResult(result);
  // if (temp.success && temp.code === 200) {
  //   sessionStorage.setItem(key, JSON.stringify(temp));
  // }
  return temp;
};
export {
  getPrice
};
