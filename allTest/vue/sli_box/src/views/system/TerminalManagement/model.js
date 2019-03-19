import apiGetList from './api/get-list';
import apiDelAd from './api/del-ad';
import apiDelBatchAd from './api/del-batch-ad';
import apiSwitch from './api/switch';
import apiGetSelectedAdList from './api/selected-ad-list';
import apiExportReport from './api/export-report';

import formatResult from 'model/formatResult';
import listResult from 'model/listResult';

// 终端管理列表
const getList = async data => formatResult(listResult(await apiGetList(data), x => ({
  merchantName: x.name, // 商户名称
  boxNo: x.box_no, // 盒子编码
  address: x.address, // 盒子地址
  status: x.is_online, // 盒子状态
  statusBackstage: x.is_online_formatted, // 盒子状态
  adNumber: x.advert_quality, // 广告数量
  adSwitch: x.status, // 广告开关
  id: x.box_id // 盒子ID

})));

// 已选的广告列表
const getSelectedAdList = async (data) => {
  const result = await apiGetSelectedAdList(data);
  if (result.success) {
    result.data = result.data.items.map(x => ({
      advertiserName: x.advert_merchants_name, // 广告商名称
      adName: x.advert_name, // 广告名称
      launchDate: `${x.start_day_formatted}~${x.end_day_formatted}`, // 投放日期
      launchTime: `${x.start_time_formatted}~${x.end_time_formatted}`, // 投放时段
      remarks: x.notes, // 备注
      id: x.box_advert_plan_id // 盒子广告计划ID
    }));
  }
  return formatResult(result);
};

// 删除广告
const delAd = async params => formatResult(await apiDelAd(params));

// 批量删除广告
const delBatchAd = async params => formatResult(await apiDelBatchAd(params));

// 开启广告/关闭广告
const switchAd = async params => formatResult(await apiSwitch(params));

// 导出
const reportExport = async (data) => {
  apiExportReport(data);
};

export {
  getList,
  getSelectedAdList,
  delAd,
  switchAd,
  reportExport,
  delBatchAd
};
