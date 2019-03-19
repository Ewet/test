import apiGetList from './api/get-list';
import apiGetItem from './api/get-item';
import apiModifyItem from './api/modify-item';
import apiStartItem from './api/start-item';
import apiEndingItemItem from './api/end-item';
import apiDelItem from './api/del-item';
import apiAddItem from './api/add-item';
import apiGetDetailItem from './api/get-detailItem';

import formatResult from 'model/formatResult';
import listResult from 'model/listResult';

// 活动列表
const getList = async data => formatResult(listResult(await apiGetList(data), x => ({
  id: x.activity_id, // 活动ID,
  status: parseInt(x.status, 10), // 活动状态,0:待开始 10：进行中 20：已结束
  createdTime: x.created_time_formatted, // 新建时间
  activityName: x.activity_name, // 活动名称
  activityTimeStart: x.start_time_formatted, // 活动开始时间
  activityTimeEnd: x.end_time_formatted, // 活动结束时间
  activeState: x.status_formatted, // 活动状态
  builtMan: x.nickname, // 新建人
  remainingTime: x.remaining_time_formatted // 活动剩余时间
})));

// 编辑获取详情
const getItem = async (activityId) => {
  const result = await apiGetItem({
    activity_id: activityId
  });
  if (result.success) {
    const data = result.data;
    result.data = {
      activeObject: data.activity_target,
      activeCycle: data.cycle,
      activityName: data.activity_name,
      activityTimeStart: data.start_time_formatted,
      activityTimeEnd: data.end_time_formatted,
      activityRules: data.description,
      boxList: data.box_list.map(x => ({
        boxId: x.box_id,
        boxNo: x.box_no
      })),
      commodityList: data.goods_list.map(x => ({
        goodsBom: x.goods_bom,
        goodsName: x.goods_name
      }))
    };
  }
  return formatResult(result);
};
// 编辑确定
const modifyItem = async params => formatResult(await apiModifyItem(params));
// 开始
const startItem = async id => formatResult(await apiStartItem({
  activity_id: id
}));
// 结束
const endingItem = async id => formatResult(await apiEndingItemItem({
  activity_id: id
}));
// 删除
const delItem = async id => formatResult(await apiDelItem({
  activity_id: id
}));
// 新增
const addItem = async params => formatResult(await apiAddItem(params));
// 获取详情
const getDetailItem = async (id) => {
  // return formatResult(await apiGetDetailItem({
  //   activity_id: id
  // }));
  const result = await apiGetDetailItem({
    activity_id: id
  });
  if (result.success) {
    const data = result.data;
    result.data = {
      activityName: data.activity_name,
      activeCycle: data.cycle,
      createdTime: data.created_time_formatted,
      activityTimeStart: data.start_time_formatted,
      activityTimeEnd: data.end_time_formatted,
      activeState: data.status_formatted, // 活动状态
      builtMan: data.nickname, // 新建人
      activityRules: data.description,
      boxList: data.box_list.map(x => ({
        boxId: x.box_id,
        boxNo: x.box_no
      })),
      commodityList: data.goods_list.map(x => ({
        goodsBom: x.goods_bom,
        goodsName: x.goods_name
      }))
    };
  }
  return formatResult(result);
};
export {
  getList,
  getItem,
  addItem,
  delItem,
  startItem,
  endingItem,
  modifyItem,
  getDetailItem
};
