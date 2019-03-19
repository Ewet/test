<template>
  <Form ref="formValidate" :model="formValidate" class="formValidate" :rules="ruleValidate" :label-width="70">
        <FormItem label="开始" prop="startTime" >
            <TimePicker
            @on-change="checkTime"
            v-model="formValidate.startTime"
            type="time" placeholder="开始"
            style="width: 100%">
            </TimePicker>
        </FormItem>
        <FormItem label="结束" prop="endTime" >
            <TimePicker
            @on-change="checkTime"
            v-model="formValidate.endTime"
            type="time"
            placeholder="结束"
            style="width: 100%">
            </TimePicker>
        </FormItem>
        <FormItem label="模式" prop="pattern" >
            <Select v-model="formValidate.pattern" clearable placeholder="维护状态" @on-change="patternCheck" >
                <Option v-for="item in patternOption" :value="item.value" :key="item.value">{{ item.label }}</Option>
            </Select>
        </FormItem>
        <FormItem label="温度" prop="temperature" >
            <InputNumber
             :max="100"
             :min="-100"
             v-model="formValidate.temperature"
             :formatter="value => `${value}`.replace(/\D+\d*/g,'')+`°C`"
             :parser="value => value.replace('°C', '')"
             style="width:100%;"
             placeholder="温度">
             </InputNumber>
        </FormItem>
        <FormItem label="风力" prop="windPower" >
            <Select v-model="formValidate.windPower" clearable placeholder="风力" @on-change="windPowerCheck" >
                <Option v-for="item in windPowerOption" :value="item.value" :key="item.value">{{ item.label }}</Option>
            </Select>
        </FormItem>
        <FormItem label="激活" prop="activation" >
            <i-switch v-model="formValidate.activation" />
        </FormItem>
        <div style="text-align:right;margin:10px 0 0 0;">
            <AddBtn @click="add()" v-show="Object.keys(formDataAirConditioner).length<=0"/>
            <DetermineBtn @click="save()" v-show="Object.keys(formDataAirConditioner).length > 0"/>
        </div>
 </Form>
</template>
<script>
import vuexMixins from 'mixins/module-map';
import { updateAirConditioner, addAirConditionerSetting } from './model';
import { STORE_NAME } from './store';

export default {
  mixins: [vuexMixins({ moduleName: STORE_NAME })],
  name: 'LightSet',
  data () {
    const startTimeCheck = (rule, value, callback) => {
      if (value === '' || value === null || value === 'null') {
        callback(new Error('开始时间不能为空'));
      } else {
        const offNo = this.compareTime(this.formValidate.startTime, this.formValidate.endTime);
        if (offNo === false) {
          callback(new Error('开始时间要比结束时间早'));
        } else {
          callback();
        }
      }
    };
    const endTimeCheck = (rule, value, callback) => {
      if (value === '' || value === null || value === 'null') {
        callback(new Error('结束时间不能为空'));
      } else {
        callback();
      }
    };
    return {
      formValidate: {
        startTime: '', // 开始
        endTime: '', // 结束
        pattern: null, // 模式
        temperature: null, // 温度
        windPower: null, // 风力
        activation: false, // 激活
        id: ''
      },
      patternOption: [
        { value: 1, label: '送风' },
        { value: 2, label: '制冷' }
      ],
      windPowerOption: [
        { value: 1, label: '一级' },
        { value: 2, label: '二级' },
        { value: 3, label: '三级' }
      ],
      lightingState: '',
      ruleValidate: {
        startTime: [
          { required: true, validator: startTimeCheck, trigger: 'blur' }
        ],
        endTime: [
          { required: true, validator: endTimeCheck, trigger: 'blur' }
        ],
        pattern: [
          {
            required: true, type: 'number', message: '模式不能为空', trigger: 'blur'
          }
        ],
        temperature: [
          {
            required: true, type: 'number', message: '温度不能为空', trigger: 'blur'
          }
        ],
        windPower: [
          {
            required: true, type: 'number', message: '风力不能为空', trigger: 'blur'
          }
        ]
      }

    };
  },
  components: {
  },
  methods: {
    // 判断时间大小
    compareTime (time1, time2) {
      if (time1 !== '' && time1 !== 'null' && time2 !== '' && time2 !== 'null') {
        const timeArr1 = time1.split(':');
        const timeArr2 = time2.split(':');
        const timeNub1 = parseInt(timeArr1[0]) * 60 * 60 + parseInt(timeArr1[1]) * 60 + parseInt(timeArr1[2]);
        const timeNub2 = parseInt(timeArr2[0]) * 60 * 60 + parseInt(timeArr2[1]) * 60 + parseInt(timeArr2[2]);
        return timeNub1 < timeNub2;
      }
    },
    // 校验模式
    patternCheck () {
      this.$refs.formValidate.validateField('pattern');
    },
    // 校验风力
    windPowerCheck () {
      this.$refs.formValidate.validateField('windPower');
    },
    // 校验时间
    checkTime () {
      this.$refs.formValidate.validateField('startTime');
      this.$refs.formValidate.validateField('endTime');
    },
    save () {
      this.$refs.formValidate.validate(async (valid) => {
        if (valid) {
          const activation = this.formValidate.activation === false ? 2 : this.formValidate.activation === true ? 1 : null;
          const { success, msg } = await updateAirConditioner({
            start_time: this.formValidate.startTime,
            end_time: this.formValidate.endTime,
            running_mode: this.formValidate.pattern,
            temperature: this.formValidate.temperature,
            wind_speed: this.formValidate.windPower,
            activation,
            setting_id: this.formValidate.id,
            box_id: this.boxId
          });
          if (success) {
            this.$success('调整成功!');
            this.setAirConditionerSetModal(false);
            this.reloadAirConditioner();
            this.formValidate = {};
          } else {
            this.$error(msg);
          }
        } else {
        }
      });
    },
    async add () {
      this.$refs.formValidate.validate(async (valid) => {
        if (valid) {
          const activation = this.formValidate.activation === false ? 2 : this.formValidate.activation === true ? 1 : null;
          const { success, msg } = await addAirConditionerSetting({
            start_time: this.formValidate.startTime,
            end_time: this.formValidate.endTime,
            running_mode: this.formValidate.pattern,
            temperature: this.formValidate.temperature,
            wind_speed: this.formValidate.windPower,
            activation,
            box_id: this.boxId
          });
          if (success) {
            this.$success('新增成功!');
            this.setAirConditionerSetModal(false);
            this.reloadAirConditioner();
            this.formValidate = {};
          } else {
            this.$error(msg);
          }
        } else {
        }
      });
    },
    reloadAirConditioner () {
      const boxId = this.boxId;
      const boxNo = this.boxNo;
      this.showAirConditionerInfo({
        boxId,
        boxNo
      });
    }
  },
  watch: {
    timeInterval (val) {
      if (val && Object.keys(val).length > 0) {
        this.dataTable = [
          { timeInterval: val }
        ];
      } else {
        this.dataTable = [
          { timeInterval: '' }
        ];
      }
    },
    lightingStatus (val) {
      if (val && Object.keys(val).length > 0) {
        this.lightingState = val;
      } else {
        this.lightingState = '';
      }
    },
    formDataAirConditioner (val) {
      this.$refs.formValidate.resetFields();
      if (val && Object.keys(val).length > 0) {
        this.formValidate = {
          startTime: val.startTime, // 开始
          endTime: val.endTime, // 结束
          pattern: val.runningMode, // 模式
          temperature: val.temperature, // 温度
          windPower: val.windSpeed, // 风力
          activation: val.activation === 1 ? true : val.activation === 2 ? false : null, // 激活
          id: val.settingId
        };
      } else {
        this.formValidate = {
          startTime: '', // 开始
          endTime: '', // 结束
          pattern: null, // 模式
          temperature: null, // 温度
          windPower: null, // 风力
          activation: false, // 激活
          id: ''
        };
      }
    }
  }
};
</script>

<style lang="less">
  .formValidate{
    ::-webkit-input-placeholder{
      color:#c5c8ce!important;
    }
    ::-moz-placeholder{   /* Mozilla Firefox 19+ */
        color:#c5c8ce!important;
    }
    :-moz-placeholder{    /* Mozilla Firefox 4 to 18 */
        color:#c5c8ce!important;
    }
    :-ms-input-placeholder{  /* Internet Explorer 10-11 */
        color:#c5c8ce!important;
    }
  }
</style>
