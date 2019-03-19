import apiGetList from './api/get-list';
import apiGetCount from './api/get-count';
import apiAduitItem from './api/aduit-item';
import apiRemittanceItem from './api/remittance-item';
import listResult from 'model/listResult';
import formatResult from 'model/formatResult';

const getList = async data => formatResult(listResult(await apiGetList(data), x => ({
  memberAccount: x.mobile,
  withdrawalAmount: x.amount,
  realAmount: x.real_amount,
  accountNumber: x.account.account,
  createTime: x.create_time_formatted,
  grantTime: x.grant_time_formatted,
  status: x.status_formatted,
  id: x.draw_id,
  withdrawType: x.withdraw_type_formatted
})));

const getCount = async () => {
  const result = await apiGetCount();
  if (result.success) {
    const data = result.data;
    result.data = {
      pendingReview: data.status_inReview, // 待审核
      pendingPayment: data.status_unissued, // 未发放
      paid: data.status_grant // 已发放
    };
  }
  return formatResult(result);
};

const aduitItem = async (id) => {
  const result = await apiAduitItem({
    draw_id: id
  });
  return formatResult(result);
};
const remittanceItem = async (id) => {
  const result = await apiRemittanceItem({
    draw_id: id
  });
  return formatResult(result);
};

export {
  getList,
  getCount,
  aduitItem,
  remittanceItem
};
