import apiGetList from './api/get-list';
import apiGetItem from './api/get-item';
import apiAddItem from './api/add-item';
import apiDelItem from './api/del-item';
import apiUpdateItem from './api/update-item';
import formatResult from 'model/formatResult';
import listResult from 'model/listResult';
// 渠道商列表
const getList = async data => formatResult(listResult(await apiGetList(data), x => ({
  merchantName: x.merchant_name,
  legalPerson: x.legal_person,
  address: x.address,
  goodsType: x.goods_type,
  contact: x.name,
  mobile: x.mobile,
  systemAccount: x.account_number,
  // 'password': x.password,
  merchantId: x.merchant_id

})));
const getItem = async (merchantId) => {
  const result = await apiGetItem({
    merchant_id: merchantId
  });
  if (result.success) {
    const data = result.data;
    result.data = {
      merchantName: data.merchant_name,
      legalPerson: data.legal_person,
      address: data.address,
      goodsType: data.goods_type,
      contact: data.name,
      mobile: data.mobile,
      systemAccount: data.account_number,
      password: data.password,
      newpassword: data.password,
      merchantId: data.merchant_id
    };
  }
  return formatResult(result);
};
const addItem = async params => formatResult(await apiAddItem(params));
const updateItem = async params => formatResult(await apiUpdateItem(params));
const delItem = async merchantId => formatResult(await apiDelItem({
  merchant_id: merchantId
}));

export {
  getList,
  getItem,
  addItem,
  updateItem,
  delItem
};
