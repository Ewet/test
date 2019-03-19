import apiGetList from './api/get-list';
import apiGetLightMode from './api/lightMode';
import apiSetLight from './api/setLight';
import apiGetAirConditionerList from './api/airConditionerList';
import apiSetAirConditioner from './api/updateAirConditionerSetting';
import apiSettingStatus from './api/settingStatus';
import apiDelAirConditioner from './api/deleteAirConditionerSetting';
import apiUpdateGlobalItem from './api/global-settings';
import apiUpdateMediaItem from './api/media-settings';
import apiGetGlobalInfo from './api/get-global-info';
import apiGetMediaInfo from './api/get-media-info';
import apiStartMaintain from './api/startMaintenance';
import apiEndMaintain from './api/stopMaintenance';
import apiGetAirConditionerSetting from './api/getAirConditionerSetting';
import apiCreatAirConditionerSetting from './api/creatAirConditionerSetting';
import apiSwitchingMode from './api/updateAirConditionerMode';
import formatResult from 'model/formatResult';
import listResult from 'model/listResult';

// 列表
const getList = async data => formatResult(listResult(await apiGetList(data), x => ({
  boxStatusFormat: x.box_status_format, // 盒子状态
  boxStatus: x.box_status, // 盒子状态
  inMaintenance: x.in_maintenance, // 是否正在维护
  boxNo: x.box_no, // 盒子编号
  hasFault: x.has_fault, // 0.没有故障 1.存在故障
  hasFaultFormat: x.has_fault_format, // 故障状态
  lightsArr: x.lights, // 灯光状态数组
  conditionerModeFromat: x.conditioner_mode_fromat, // 空调运行模式
  id: x.box_id, // 盒子id
  type: x.type,
  cellClassName: {
    boxStatusFormat: x.box_status === 2 ? 'green' : 'red',
    hasFaultFormat: x.has_fault === 1 ? 'red' : ''
  }
})));

// 盒子灯光模式查看
const getLightInfo = async (params) => {
  const result = await apiGetLightMode(params);
  if (result.success) {
    const data = result.data;
    result.data = {
      mode: data.mode, // 模式
      turnOnTime: data.turn_on_time ? data.turn_on_time : '', // 开始时间
      turnOffTime: data.turn_off_time ? data.turn_off_time : '', // 结束时间
      modeFromat: data.mode_fromat // 模式
    };
  }
  return formatResult(result);
};

// 盒子灯光设置
const updateLight = async params => formatResult(await apiSetLight(params));

// 盒子空调状态列表
const getAirConditionerList = async (params) => {
  const result = await apiGetAirConditionerList(params);
  if (result.success) {
    const autoModeList = result.data.autoModeList;
    const windSpeedJson = {
      1: '一级',
      2: '二级',
      3: '三级'
    };
    result.data.autoModeList = autoModeList.map(x => ({
      startTime: x.start_time ? x.start_time : '', // //开始时间
      runningMode: x.running_mode, // 运行模式
      activationFromat: x.activation_fromat, // 激活状态
      endTime: x.end_time ? x.end_time : '', // 结束时间
      temperature: `${x.temperature}°C`, // 温度
      windSpeed: windSpeedJson[x.wind_speed.toString()], // 风力
      activation: x.activation, // 激活状态  1.已激活 2.未激活
      timeInterval: x.start_time != null && x.end_time != null ? `${x.start_time}-${x.end_time}` : '暂无时段', // 时段
      conditionerId: x.conditioner_id, // 空调Id
      id: x.setting_id // ID
    }));
    return result;
  }
};

// 开始维护
const startMaintain = async id => formatResult(await apiStartMaintain({
  box_id: id
}));

// 结束维护
const endMaintain = async id => formatResult(await apiEndMaintain({
  box_id: id
}));

// 盒子空调切换模式
const airConditionerSwitchingMode = async params => formatResult(await apiSwitchingMode(params));

// 盒子空调激活状态
const settingStatus = async params => formatResult(await apiSettingStatus(params));

// 盒子调整(编辑)空调时段
const updateAirConditioner = async params => formatResult(await apiSetAirConditioner(params));
// 盒子新增空调时段
const addAirConditionerSetting = async params => formatResult(await apiCreatAirConditionerSetting(params));

// 盒子删除空调时段
const delAirConditioner = async params => formatResult(await apiDelAirConditioner(params));
// 盒子查看空调时段
const getAirConditionerSetting = async (id) => {
  const result = await apiGetAirConditionerSetting({
    setting_id: id
  });
  if (result.success) {
    const data = result.data;
    result.data = {
      startTime: data.start_time, // //开始时间
      runningMode: data.running_mode, // 运行模式
      activationFromat: data.activation_fromat, // 激活状态
      endTime: data.end_time, // 结束时间
      temperature: data.temperature, // 温度
      windSpeed: data.wind_speed, // 风力
      activation: data.activation, // 激活状态  1.已激活 2.未激活
      timeInterval: `${data.start_time}-${data.end_time}` // 时段
    };
  }
  return formatResult(result);
};

// 终端设置start
const reportGlobalSettings = async params => formatResult(await apiUpdateGlobalItem(params));
const getGlobalSettingsInfo = async (params) => {
  const result = await apiGetGlobalInfo();
  if (result.success) {
    const data = result.data;
    result.data = {
      judgmentInterval: data.ir_dither_damper_interval,
      abnormalPersistence: data.ir_dither_damper_timeout,
      planningStage: data.ir_power_controller_planning,
      dormancyPhase: data.ir_power_controller_dormancy,
      awakeningStage: data.ir_power_controller_revival,
      reportingInterval: data.report_interval,
      closeDoorTimeout: data.close_door_timeout,
      boxDelay: data.box_delay_checking_after_departure,
      cabinetDelay: data.cabinet_delay_checking_after_departure
    };
  }

  return formatResult(result);
};
const reportMediasettings = async params => formatResult(await apiUpdateMediaItem(params));
const getMediasettingsInfo = async (boxId) => {
  const result = await apiGetMediaInfo({
    box_id: boxId
  });
  if (result.success) {
    const data = result.data;
    result.data = {
      menuUrl: data.media_path,
      productVideo: data.intro_volume,
      advertisingVideo: data.advertising_volume,
      boxBg: data.bgm_volume,
      inBoxVoice: data.inner_voice_volume,
      outBoxVoice: data.outer_voice_volume
    };
  }
  return formatResult(result);
};
// 终端设置end

export {
  reportGlobalSettings,
  getGlobalSettingsInfo,
  reportMediasettings,
  getMediasettingsInfo,
  getList,
  getLightInfo,
  updateLight,
  getAirConditionerList,
  updateAirConditioner,
  delAirConditioner,
  startMaintain,
  endMaintain,
  getAirConditionerSetting,
  addAirConditionerSetting,
  airConditionerSwitchingMode,
  settingStatus
};
