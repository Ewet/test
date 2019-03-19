<!--客户端实时状态列表-->
<template>
  <div class="realTimeStatus">
    <ModuleHeader title="客户端实时状态列表">
      <ZBtn slot="right" @click="setGlobalSettingModal(true)">全局设置</ZBtn>
    </ModuleHeader>
    <Toolbar/>
    <List slot="content" style="height:100%;overflow:auto"/>
    <Modal
        width="1300px"
        :value="showBoxStatusModal"
        :title="`查看盒子状态（${boxNo}）`"
        :footerHide= "true"
        :mask-closable="false"
        @on-cancel="closeModal">
        <BoxStatus/>
    </Modal>
    <Modal
        width="500"
        :value="lightModal"
        :title="`${lightName}设置(${boxNo})`"
        :footerHide= "true"
        :mask-closable="false"
        @on-cancel="setLightModal(false)">
        <LightInfo/>
    </Modal>
    <Modal
        width="384"
        :value="lightSetModal"
        title="编辑灯光设置"
        :footerHide= "true"
        :mask-closable="false"
        @on-cancel="setLightSetModal(false)">
        <LightEdit/>
    </Modal>
    <Modal
        width="800"
        :value="AirConditionerModal"
        :title="`盒子空调设置(${boxNo})`"
        :footerHide= "true"
        :mask-closable="false"
        @on-cancel="setAirConditionerModal(false)">
        <AirConditionerInfo/>
    </Modal>
    <Modal
        width="384"
        :value="airConditionerSetModal"
        :title="Object.keys(formDataAirConditioner).length > 0? '编辑空调设置' : '空调设置新增'"
        :footerHide= "true"
        :mask-closable="false"
        @on-cancel="setAirConditionerSetModal(false)">
        <AirConditionerEdit/>
    </Modal>
    <Modal
        :value="showTerminalModal"
        :title="`(${boxNo})客户端设置`"
        :footerHide= "true"
        :mask-closable="false"
        @on-cancel="setTerminalModal(false)"
        width="60%"
        :styles="{'min-height':'530px'}"
        >
       <Mediasettings/>
    </Modal>
    <Modal
        :value="showGlobalSettingModal"
        :title="`全局设置`"
        :footerHide= "true"
        :mask-closable="false"
        @on-cancel="setGlobalSettingModal(false)"
        width="60%"
        :styles="{'min-height':'530px'}"
        >
        <GlobalSettings/>
    </Modal>
  </div>
</template>
<script>
import vuexMixins from 'mixins/module-map';
import BoxStatus from './BoxStatus/Index';
import List from './List';
import Toolbar from './Toolbar';
import LightInfo from './LightInfo';
import AirConditionerInfo from './AirConditionerInfo';
import LightEdit from './LightEdit';
import AirConditionerEdit from './AirConditionerEdit';
import GlobalSettings from './GlobalSettings';
import Mediasettings from './Mediasettings';
import { STORE_NAME } from './store';

export default {
  mixins: [vuexMixins({ moduleName: STORE_NAME })],
  name: 'RealTimeStatusIndex',
  data () {
    return {
    };
  },
  components: {
    GlobalSettings,
    Mediasettings,
    List,
    BoxStatus,
    LightInfo,
    LightEdit,
    Toolbar,
    AirConditionerInfo,
    AirConditionerEdit
  },
  methods: {
    closeModal () {
      this.$g_emit('closeRealTimeWS');
      this.setBoxStatusModal(false);
    }
  }
};
</script>

<style scoped lang="less">
.realTimeStatus {
  header {
    position: relative;
    padding-bottom:10px;
    border-bottom: 1px solid #dddee1;
    margin-bottom: 20px;
    h2 {
      line-height: 32px;
    }
    button {
      position: absolute;
      right: 0;
      top:0;
    }
  }
}
</style>
