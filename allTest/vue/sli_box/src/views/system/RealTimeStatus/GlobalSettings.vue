<template>
    <Form ref="formCustomer" :model="formValidate" :rules="ruleValidate" :label-width="120">
      <Divider orientation="left">红外传感器高频抖动阻尼策略设置</Divider>
       <Row>
        <Col span="8">
          <FormItem label="判断间隔(毫秒)" prop="judgmentInterval" >
            <InputNumber style="width:100%;" :max="999999999" :min="1" :precision="0" v-model="formValidate.judgmentInterval" clearable ></InputNumber>
          </FormItem>
        </Col>
        <Col span="8">
          <FormItem label="异常持续(秒)" prop="abnormalPersistence" >
            <InputNumber style="width:100%;" :max="999999999" :min="1" :precision="0" v-model="formValidate.abnormalPersistence" clearable ></InputNumber>
          </FormItem>
        </Col>
      </Row>
      <Divider orientation="left">红外传感器电源休眠控制策略</Divider>
      <Row>
        <Col span="8">
          <FormItem label="计划阶段(秒)" prop="planningStage" >
            <InputNumber style="width:100%;" :max="999999999" :min="1" :precision="0" v-model="formValidate.planningStage" clearable ></InputNumber>
          </FormItem>
        </Col>
        <Col span="8">
          <FormItem label="休眠阶段(秒)" prop="dormancyPhase" >
            <InputNumber style="width:100%;" :max="999999999" :min="1" :precision="0" v-model="formValidate.dormancyPhase" clearable ></InputNumber>
          </FormItem>
        </Col>
        <Col span="8">
          <FormItem label="苏醒阶段(秒)" prop="awakeningStage" >
            <InputNumber style="width:100%;" :max="999999999" :min="1" :precision="0" v-model="formValidate.awakeningStage" clearable ></InputNumber>
          </FormItem>
        </Col>
      </Row>
      <Divider orientation="left">全量状态报告间隔</Divider>
      <Row>
        <Col span="8">
          <FormItem label="上报间隔(秒)" prop="reportingInterval" >
            <InputNumber style="width:100%;" :max="999999999" :min="1" :precision="0" v-model="formValidate.reportingInterval" clearable ></InputNumber>
          </FormItem>
        </Col>
      </Row>
      <Divider orientation="left">关门超时上报间隔</Divider>
      <Row>
        <Col span="8">
          <FormItem label="上报间隔(秒)" prop="closeDoorTimeout" >
            <InputNumber style="width:100%;" :max="999999999" :min="1" :precision="0" v-model="formValidate.closeDoorTimeout" clearable ></InputNumber>
          </FormItem>
        </Col>
      </Row>
      <Divider orientation="left">离开后的校对延迟策略</Divider>
      <Row>
        <Col span="8">
          <FormItem label="盒子策略(秒)" prop="boxDelay" >
            <InputNumber style="width:100%;" :max="999999999" :min="1" :precision="0" v-model="formValidate.boxDelay" clearable ></InputNumber>
          </FormItem>
        </Col>
        <Col span="8">
          <FormItem label="酒柜策略(秒)" prop="cabinetDelay" >
            <InputNumber style="width:100%;" :max="999999999" :min="0" :precision="0" v-model="formValidate.cabinetDelay" clearable ></InputNumber>
          </FormItem>
        </Col>
      </Row>
      <FormItem>
            <ZBtn @click="save('formValidate')">提交</ZBtn>
        </FormItem>
      </Form>
</template>
<script>
import vuexMixins from 'mixins/module-map';
import { getGlobalSettingsInfo, reportGlobalSettings } from './model';//
import { STORE_NAME } from './store';

export default {
  mixins: [vuexMixins({ moduleName: STORE_NAME })],
  name: 'GlobalSettings',
  data () {
    return {
      formValidate: {
        judgmentInterval: null,
        abnormalPersistence: null,
        planningStage: null,
        dormancyPhase: null,
        awakeningStage: null,
        reportingInterval: null,
        closeDoorTimeout: null,
        boxDelay: null,
        cabinetDelay: null
      },
      ruleValidate: {
        // judgmentInterval: [
        //   {
        //     required: true,
        //     type: 'number',
        //     message: '判断间隔不能为空',
        //     trigger: 'blur'
        //   }
        // ],
        // abnormalPersistence: [
        //   {
        //     required: true,
        //     type: 'number',
        //     message: '异常持续不能为空',
        //     trigger: 'blur'
        //   }
        // ],
        // planningStage: [
        //   {
        //     required: true,
        //     type: 'number',
        //     message: '计划阶段秒数不能为空',
        //     trigger: 'blur'
        //   }
        // ],
        // dormancyPhase: [
        //   {
        //     required: true,
        //     type: 'number',
        //     message: '休眠阶段秒数不能为空',
        //     trigger: 'blur'
        //   }
        // ],
        // awakeningStage: [
        //   {
        //     required: true,
        //     type: 'number',
        //     message: '苏醒阶段秒数不能为空',
        //     trigger: 'blur'
        //   }
        // ],
        // reportingInterval: [
        //   {
        //     required: true,
        //     type: 'number',
        //     message: '上传间隔不能为空',
        //     trigger: 'blur'
        //   }
        // ]
      }
    };
  },
  mounted () {
    // this.loadData();
  },
  methods: {
    async loadData () {
      this.spinShow = true;
      const { success, data, msg } = await getGlobalSettingsInfo();
      // console.log('1', data);
      if (success) {
        this.formValidate.judgmentInterval = data.judgmentInterval;
        this.formValidate.abnormalPersistence = data.abnormalPersistence;
        this.formValidate.planningStage = data.planningStage;
        this.formValidate.dormancyPhase = data.dormancyPhase;
        this.formValidate.awakeningStage = data.awakeningStage;
        this.formValidate.reportingInterval = data.reportingInterval;
        this.formValidate.closeDoorTimeout = data.closeDoorTimeout;
        this.formValidate.boxDelay = data.boxDelay;
        this.formValidate.cabinetDelay = data.cabinetDelay;
      } else if (msg) {
        this.$error(msg);
      }
      this.spinShow = false;
    },
    clearData () { // 此方法用于清空页面数据
      this.formValidate.judgmentInterval = null;
      this.formValidate.abnormalPersistence = null;
      this.formValidate.planningStage = null;
      this.formValidate.dormancyPhase = null;
      this.formValidate.awakeningStage = null;
      this.formValidate.reportingInterval = null;
      this.formValidate.closeDoorTimeout = null;
      this.formValidate.boxDelay = null;
      this.formValidate.cabinetDelay = null;
    },
    async save () {
      const { success, msg } = await reportGlobalSettings({
        ir_dither_damper_interval: this.formValidate.judgmentInterval,
        ir_dither_damper_timeout: this.formValidate.abnormalPersistence,
        ir_power_controller_planning: this.formValidate.planningStage,
        ir_power_controller_dormancy: this.formValidate.dormancyPhase,
        ir_power_controller_revival: this.formValidate.awakeningStage,
        report_interval: this.formValidate.reportingInterval,
        close_door_timeout: this.formValidate.closeDoorTimeout,
        box_delay_checking_after_departure: this.formValidate.boxDelay,
        cabinet_delay_checking_after_departure: this.formValidate.cabinetDelay
      });
      if (success) {
        this.$success('保存成功!');
        this.setGlobalSettingModal(false);
        // this.setBoxNo('');
        // this.setBoxId('');
      } else {
        this.$error(msg);
      }
    }
  },
  watch: {
    showGlobalSettingModal (val) {
      if (val) {
        this.loadData();
      }
    }
  },
  components: {
  }
};
</script>
<style lang="less">
.ivu-input-number-handler-wrap{
      display: none;
    }
</style>
