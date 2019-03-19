import apiGetList from './api/get-list';
import apiGetItem from './api/get-item';
import apiDelItem from './api/del-item';
import apiAddItem from './api/add-item';
import apiUpdateItem from './api/update-item';

import formatResult from 'model/formatResult';
import listResult from 'model/listResult';

const getList = async data => formatResult(listResult(await apiGetList(data), x => ({
  createTimeFormatted: x.created_time_formatted,
  merchantName: x.name,
  legalRepresentative: x.legal_person,
  merchantAddress: x.address,
  joiningTime: x.join_time_formatted,
  adder: x.creator_formatted,
  merchantUsername: x.username,
  id: x.merchant_id
})));

const delItem = async id => formatResult(await apiDelItem({
  merchant_id: id
}));

const getItem = async (id) => {
  const result = await apiGetItem({
    merchant_id: id
  });
  if (result.success) {
    const data = result.data;
    result.data = {
      merchantName: data.name,
      legalRepresentative: data.legal_person,
      merchantAddress: data.address,
      mobile: data.mobile,
      bankAccount: data.bank_account,
      bankName: data.bank_name,
      joiningTime: data.join_time_formatted,
      // 'merchantUsername': '不存在',
      id: data.merchant_id
    };
  }
  return formatResult(result);
};

const addItem = async params => formatResult(await apiAddItem(params));
const updateItem = async params => formatResult(await apiUpdateItem(params));

export {
  getList,
  delItem,
  getItem,
  addItem,
  updateItem
};
