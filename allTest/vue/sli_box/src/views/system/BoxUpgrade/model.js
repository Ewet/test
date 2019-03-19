
import apiGetList from './api/get-list';
import apiGetItem from './api/get-item';
import apiFirmwaresTypeList from './api/firmwares-type-list';
import apiFileList from './api/file-list';
import apiInfoList from './api/info-list';
import apiResultsUpgrade from './api/results-upgrade';
import apiBatchUpgrade from './api/batch-upgrade';
import apiGetVersionInfo from './api/get-version-info';

import formatResult from 'model/formatResult';
import listResult from 'model/listResult';

// 盒子升级列表
const getList = async data => formatResult(listResult(await apiGetList(data), x => ({
  id: x.box_id, // 盒子ID
  boxNo: x.box_no, // 盒子编号
  boxStyle: x.type_formatted, // 盒子型号
  address: x.address, // 地区
  upgradePeople: x.user_name, // 升级者
  time: x.updated_formatted, // 升级时间
  operator: x.operator_name, // 运营商名称
  hardwareVersion: x.hardware_version, // 硬件固件版本号
  clientMainVersion: x.client_main_version, // 客户端主程序版本号
  clientMonitorVersion: x.client_monitor_version, // 客户端监控程序版本号
  clentDaemonVersion: x.clent_daemon_version, // 客户端守护程序版本号
  clientAdvVersion: x.client_adv_version // 客户端广告程序版本号
})));

// 盒子升级-详情
const getItem = async (boxId) => {
  const result = await apiGetItem({
    box_id: boxId
  });
  if (result.success) {
    const data = result.data;
    result.data = {
      hardware: data.hardware_version, // 硬件程序
      client: data.client_main_version, // 客户端主程序
      assistant: data.client_monitor_version, // 监控助手
      guard: data.clent_daemon_version, // 程序守卫
      advertisement: data.client_adv_version, // 广告程序
      id: data.box_id // 盒子ID
    };
  }
  return formatResult(result);
};

// 盒子升级-固件类型列表
const getFirmwaresTypeList = async () => {
  const result = await apiFirmwaresTypeList();
  if (result.success) {
    const data = result.data;
    result.data = {
      client_main: data.client_main, // 客户端主程序
      client_monitor: data.client_monitor, // 客户端监控程序
      client_adv: data.client_adv, // 客户端广告程序
      clent_daemon: data.clent_daemon, // 客户端守护程序
      hardware: data.hardware // 硬件固件
    };
  }
  return formatResult(result);
};

// 盒子升级-固件文件列表
const getFileList = async (firmwaresType) => {
  const result = await apiFileList({
    firmwares_type: firmwaresType // 固件类型
  });
  if (result.success) {
    const data = result.data.items;
    result.data = data.map(x => ({
      name: x.file_name, // 固件名称
      value: x.firmwares_id, // 主键id
      fileId: x.file_id, // 文件id
      url: x.url // 文件url
    }));
  }
  return formatResult(result);
};

// 盒子升级-固件信息列表
const getInfoList = async (parameter) => {
  const result = await apiInfoList(parameter);
  if (result.success) {
    const data = result.data;
    result.data = {
      packagingType: data.packaging_type_formatted, // 打包类型
      size: data.size, // 固件大小
      typeFormatted: data.type_formatted, // 盒子型号格式化(1-摩萄盒子,2-摩萄酒柜)
      userName: data.user_name, // 操作人
      version: data.version, // 版本号
      remarks: data.remarks, // 备注
      time: data.created_formatted // 升级时间
    };
  }
  return formatResult(result);
};

// 盒子升级-搜索结果列表
const getResultsUpgrade = async (parameter) => {
  const result = await apiResultsUpgrade(parameter);
  return formatResult(result);
};

// 盒子升级-批量升级
const getBatchUpgrade = async (boxIdArr) => {
  const result = await apiBatchUpgrade(boxIdArr);
  return formatResult(result);
};

// 查询盒子版本信息
const getLatestEdition = async (boxIdStr) => {
  const result = await apiGetVersionInfo(boxIdStr);
  return formatResult(result);
};

export {
  getList,
  getItem,
  getFirmwaresTypeList,
  getFileList,
  getInfoList,
  getResultsUpgrade,
  getBatchUpgrade,
  getLatestEdition
};
