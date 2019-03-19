<template>
  <div>
        <Form  ref="formValidate" :model="formValidate" :rules="ruleValidate" :label-width="90" >
            <FormItem label="开灯时间" prop="openTime" >
                  <TimePicker
                    @on-change="checkTime"
                    v-model="formValidate.openTime"
                    type="time"
                    placeholder="开灯时间"
                    style="width: 100%;">
                  </TimePicker>
            </FormItem>
            <FormItem label="关灯时间" prop="closeTime" >
                  <TimePicker
                    @on-change="checkTime"
                    v-model="formValidate.closeTime"
                    type="time"
                    placeholder="关灯时间"
                    style="width: 100%;">
                  </TimePicker>
            </FormItem>
            <div class="formBtn">
                <DetermineBtn @click="setTime"/>
            </div>

        </Form>
    </div>
</template>

<script>
import vuexMixins from 'mixins/module-map';
import { STORE_NAME } from './store';

export default {
  mixins: [vuexMixins({ moduleName: STORE_NAME })],
  name: 'LightSet',
  data () {
    const openTimeCheck = (rule, value, callback) => {
      if (value === '' || value === null || value === 'null') {
        callback(new Error('开灯时间不能为空'));
      } else {
        const offNo = true;// this.compareTime(this.formValidate.openTime, this.formValidate.closeTime);
        if (offNo === false) {
          callback(new Error('开灯时间要比关灯时间早'));
        } else {
          callback();
        }
      }
    };
    const closeTimeCheck = (rule, value, callback) => {
      if (value === '' || value === null || value === 'null') {
        callback(new Error('关灯时间不能为空'));
      } else {
        callback();
      }
    };
    return {
      formValidate: {
        openTime: '',
        closeTime: ''
      },
      ruleValidate: {
        openTime: [
          { required: true, validator: openTimeCheck, trigger: 'blur' }
        ],
        closeTime: [
          { required: true, validator: closeTimeCheck, trigger: 'blur' }
        ]
      }
    };
  },
  mounted () {
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
    // 校验时间
    checkTime () {
      this.$refs.formValidate.validateField('openTime');
      this.$refs.formValidate.validateField('closeTime');
    },
    setTime () {
      this.$refs.formValidate.validate(async (valid) => {
        if (valid) {
          const openTime = this.formValidate.openTime;
          const closeTime = this.formValidate.closeTime;
          const res = await this.saveLightingSetUp({
            box_id: this.boxId,
            light_no: this.lightNo,
            mode: 'auto',
            start_time: openTime,
            end_time: closeTime
          });
          if (res.success) {
            this.reload();
            this.setLightSetModal(false);
            this.showLightInfo({
              boxId: this.boxId,
              lightNo: this.lightNo,
              boxNo: this.boxNo,
              lightName: this.lightName
            });
          }
        } else {
        }
      });
    }

  },
  watch: {
    lightSetModal (val) {
      if (val) {
        this.$refs.formValidate.resetFields();
        if (this.timeInterval !== '暂无时段') {
          const timeIntervalArr = this.timeInterval.split('-');
          this.formValidate.openTime = timeIntervalArr[0];
          this.formValidate.closeTime = timeIntervalArr[1];
        }
      }
    }
  }
};
</script>

<style lang="less" scoped>
  .table{
    border-collapse: collapse;
    width: 100%;
    border:1px solid #e8eaec;
  }
  .table th{
    border:1px solid #e8eaec;
    padding: 0 0 0 15px;
    background-color: #f8f8f9;
  }
  .table td{
    text-align: center;
    border:1px solid #e8eaec;
  }
  .table tr{
    height: 40px;
  }
  .formBtn{
    text-align: right;
  }
</style>
