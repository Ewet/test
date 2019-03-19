
import apiGetList from './api/get-list';
import apiGetItem from './api/get-item';
import apiAddItem from './api/add-item';
import apiDelItem from './api/del-item';
import apiDelList from './api/del-list';
import apiUpdateItem from './api/update-item';

import formatResult from 'model/formatResult';
import listResult from 'model/listResult';

// 投放计划列表
const getList = async data => formatResult(listResult(await apiGetList(data), x => ({
  planId: x.advert_plan_id,
  deliveryPlanName: x.advert_plan_name,
  deliveryDate: `${x.start_day_formatted}-${x.end_day_formatted}`,
  deliveryTime: `${x.start_time_formatted}-${x.end_time_formatted}`,
  remark: x.notes
})));

const getItem = async (params) => {
  const result = await apiGetItem(params);
  if (result.success) {
    const data = result.data;
    result.data = {
      deliveryPlanId: data.advert_plan_id, // wu
      deliveryPlanName: data.advert_plan_name,
      checkedBoxList: data.box_data.map(x => ({
        merchantName: x.name,
        boxNo: x.box_no,
        boxId: x.box_id,
        address: x.address
      })),
      deliveryDate: [data.start_day_formatted, data.end_day_formatted],
      deliveryTime: [data.start_time_formatted, data.end_time_formatted],
      playTimes: data.advert_plan_count,
      remark: data.notes
    };
  }
  return formatResult(result);
};
const addItem = async params => formatResult(await apiAddItem(params));
const updateItem = async params => formatResult(await apiUpdateItem(params));
const delItem = async params => formatResult(await apiDelItem(params));
const delList = async params => formatResult(await apiDelList(params));

export {
  getList,
  getItem,
  addItem,
  updateItem,
  delItem,
  delList
};
