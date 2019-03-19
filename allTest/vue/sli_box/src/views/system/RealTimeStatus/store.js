import {
  getList,
  getLightInfo,
  updateLight,
  getAirConditionerList,
  updateAirConditioner,
  getAirConditionerSetting
} from './model';
import factory from 'store/factory';

export const STORE_NAME = 'realTimeStatus';
export default factory.createInstance({
  fetchList: getList,
  state: {
    boxStatusData: [],
    showBoxStatusModal: false,
    showTerminalModal: false, // 终端设置
    showGlobalSettingModal: false, // 全局设置
    boxNo: '', // 盒子编号
    lightModal: false, // 是否显示灯光Model
    lightSetModal: false, // 是否显示灯光设置Model
    AirConditionerModal: false, // 是否显示空调Model
    airConditionerSetModal: false, // 是否显示空调设置Model
    timeInterval: '', // 是否显示灯光时间段
    lightingStatus: '', // 灯光模式
    boxId: '', // 盒子id
    conditionerId: '', // 空调Id
    lightNo: '', // 灯光编号
    airConditionerList: [], // 空调状态列表
    airConditionerStatus: '', // 空调模式
    formDataAirConditioner: {}, // 单个空调状态数据
    airConditionerId: '', // 单个空调状态数据Id
    lightName: '', // 灯名,
    boxType: null
  },
  mutation: {
    setLightName (state, val) {
      state.lightName = val;
    },
    setTerminalModal (state, val) {
      state.showTerminalModal = val;
    },
    setGlobalSettingModal (state, val) {
      state.showGlobalSettingModal = val;
    },
    setBoxId (state, val) {
      state.boxId = val;
    },
    setConditionerId (state, val) {
      state.conditionerId = val;
    },
    setLightNo (state, val) {
      state.lightNo = val;
    },
    setBoxStatusModal (state, val) {
      state.showBoxStatusModal = val;
    },
    setBoxStatusData (state, val) {
      state.boxStatusData = val;
    },
    setLightModal (state, val) {
      state.lightModal = val;
      if (!val) {
        state.lightingStatus = '';
      }
    },
    setLightSetModal (state, val) {
      state.lightSetModal = val;
    },
    setAirConditionerModal (state, val) {
      state.AirConditionerModal = val;
      if (!val) {
        // state.boxId = '';
        state.conditionerId = '';
      }
    },
    setAirConditionerSetModal (state, val) {
      state.airConditionerSetModal = val;
      state.formDataAirConditioner = {};
    },
    setTimeInterval (state, val) {
      state.timeInterval = val;
    },
    setLightingStatus (state, val) {
      state.lightingStatus = val;
    },
    setBoxNo (state, val) {
      state.boxNo = val;
    },
    setAirConditionerStatus (state, val) {
      state.airConditionerStatus = val;
    },
    setAirConditionerList (state, val) {
      state.airConditionerList = val;
    },
    setFormDataAirConditioner (state, val) {
      state.formDataAirConditioner = val;
    },
    setBoxType (state, val) {
      state.boxType = val;
    }
  },
  action: {
    // 设置灯光时间段
    async setLightingTime ({
      commit,
      dispatch
    }, params) {
      const time = `${params.openTime}-${params.closeTime}`;
      commit('setTimeInterval', time);
      commit('setLightSetModal', false);
    },

    // 保存灯光设置
    async saveLightingSetUp ({
      commit,
      dispatch
    }, params) {
      return updateLight(params);
    },

    // 显示灯光弹框
    async showLightInfo ({
      commit,
      dispatch
    }, params) {
      const { success, data, msg } = await getLightInfo({ box_id: params.boxId, light_no: params.lightNo });
      if (success) {
        const lightingStatus = data.mode;
        const time = data.turnOnTime && data.turnOffTime ? `${data.turnOnTime}-${data.turnOffTime}` : '暂无时段';
        commit('setLightingStatus', lightingStatus);
        commit('setTimeInterval', time);
        commit('setBoxId', params.boxId);
        commit('setBoxNo', params.boxNo);
        commit('setLightName', params.lightName);
        commit('setLightNo', params.lightNo);
        commit('setLightModal', true);
        // dispatch('reload');
      } else {
        return msg;
      }
    },
    // 显示终端设置
    async viewTerminalSetting ({
      commit,
      dispatch
    }, params) {
      commit('setBoxId', params.id);
      commit('setBoxNo', params.boxNo);
      commit('setTerminalModal', true);
    },
    // 显示空调弹框
    async showAirConditionerInfo ({
      commit,
      dispatch
    }, params) {
      const { success, data, msg } = await getAirConditionerList({ box_id: params.boxId });
      if (success) {
        const boxId = data.box_id;
        const conditionerId = data.conditioner_id;
        const dataList = data.autoModeList;
        const airConditionerStatus = data.mode;
        commit('setBoxId', boxId);
        commit('setConditionerId', conditionerId);
        commit('setAirConditionerStatus', airConditionerStatus);
        commit('setAirConditionerList', dataList);
        commit('setBoxNo', params.boxNo);
        commit('setAirConditionerModal', true);
      } else {
        return msg;
      }
    },
    // 保存空调设置
    async saveAirConditioner ({
      commit,
      dispatch
    }, params) {
      const { success, msg } = await updateAirConditioner(params);
      if (success) {
        commit('setAirConditionerModal', false);
        commit('setAirConditionerStatus', '');
      } else {
        return msg;
      }
    },
    // 获取单个空调设置数据
    async getAirConditionerSetting ({
      commit,
      dispatch
    }, params) {
      const { success, data, msg } = await getAirConditionerSetting(params);
      if (success) {
        data.settingId = params;
        commit('setAirConditionerSetModal', true);
        commit('setFormDataAirConditioner', data);
      } else {
        return msg;
      }
    },
    // 显示盒子状态和保存盒子id
    boxStatusAction ({
      commit
    }, params) {
      commit('setBoxStatusModal', true);
      commit('setBoxId', params);
    }
  }
});
