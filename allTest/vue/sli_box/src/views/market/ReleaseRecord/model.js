import apiGetList from './api/get-list';
import formatResult from 'model/formatResult';
import listResult from 'model/listResult';
import apiExportList from './api/export-list';

const getList = async data => formatResult(listResult(await apiGetList(data), x => ({
  couponName: x.coupon.name,
  memberName: x.user.nickname,
  memberMobile: x.user.mobile,
  getMethod: x.create_type_formatted,
  getTime: x.create_time_formatted,
  useTime: x.use_time === null ? '---' : x.use_time_formatted,
  useOrderId: x.order_sn === null ? '---' : x.order_sn,
  id: x.coupon_id
})));

const exportList = (data) => {
  apiExportList(data);
};

export {
  getList,
  exportList
};
