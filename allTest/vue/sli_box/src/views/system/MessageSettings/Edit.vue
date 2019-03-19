<template>
    <Form ref="formValidate" :model="formValidate" :rules="ruleValidate" :label-width="70">
        <FormItem label="推送时间" prop="startTime">
          <Row>
              <Col span="11">
              <FormItem prop="startTime">
                  <TimePicker
                  @on-change="checkTime"
                  v-model="formValidate.startTime"
                  type="time"
                  placeholder="开始时间"
                  style="width: 160px">
                  </TimePicker>
              </FormItem>
              </Col>
              <Col span="2">
                  <span>至</span>
              </Col>
              <Col span="11">
              <FormItem prop="endTime">
                  <TimePicker
                  @on-change="checkTime"
                  v-model="formValidate.endTime"
                  type="time"
                  placeholder="结束时间"
                  style="width: 160px">
                  </TimePicker>
              </FormItem>
              </Col>
          </Row>
        </FormItem>
        <FormItem label="推送日期" prop="weeks">
          <Row>
              <Col span="24">
                  <CheckboxGroup class="checkboxMain" v-model="formValidate.weeks" @on-change="checkWeeks">
                      <Checkbox label="monday">周一</Checkbox>
                      <Checkbox label="tuesday">周二</Checkbox>
                      <Checkbox label="wednesday">周三</Checkbox>
                      <Checkbox label="thursday">周四</Checkbox>
                      <Checkbox label="friday">周五</Checkbox>
                      <Checkbox label="saturday">周六</Checkbox>
                      <Checkbox label="sunday">周日</Checkbox>
                  </CheckboxGroup>
              </Col>
          </Row>
        </FormItem>
        <FormItem style="text-align:right;">
            <SaveBtn @click="save"/>
        </FormItem>
    </Form>
</template>
<script>
import { updateItem } from './model';
import vuexMixins from 'mixins/module-map';
import { STORE_NAME } from './store';

export default {
  mixins: [vuexMixins({ moduleName: STORE_NAME })],
  name: 'DepartmentManagementEdit',
  data () {
    const weeksCheck = (rule, value, callback) => {
      if (value.length === 0) {
        callback(new Error('推送日期不能为空'));
      } else {
        callback();
      }
    };
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
        startTime: '',
        endTime: '',
        weeks: [],
        id: ''
      },
      ruleValidate: {
        startTime: [
          { required: true, validator: startTimeCheck, trigger: 'blur' }
        ],
        endTime: [
          { required: true, validator: endTimeCheck, trigger: 'blur' }
        ],
        weeks: [
          { required: true, validator: weeksCheck, trigger: 'blur' }
        ]
      }
    };
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
    filtersWeek (weekArr, val) {
      if (val && val === 1) {
        const arr = [];
        weekArr.forEach((el) => {
          if (el.value === val) {
            arr.push(el.name);
          }
        });
        return arr;
      }
      const weekJson = {
        monday: 0,
        tuesday: 0,
        wednesday: 0,
        thursday: 0,
        friday: 0,
        saturday: 0,
        sunday: 0
      };
      weekArr.forEach((el) => {
        weekJson[el] = 1;
      });
      return weekJson;
    },
    checkTime () {
      this.$refs.formValidate.validateField('startTime');
      this.$refs.formValidate.validateField('endTime');
    },
    checkWeeks () {
      this.$refs.formValidate.validateField('weeks');
    },
    save () {
      this.$refs.formValidate.validate((valid) => {
        if (valid) {
          const params = this.filtersWeek(this.formValidate.weeks);
          params.admin_id = this.formValidate.id;
          params.from_time = this.formValidate.startTime;
          params.to_time = this.formValidate.endTime;
          updateItem(params).then(({ success, msg }) => {
            if (success) {
              this.$success('保存成功!');
              this.setModal(false);
              this.reload();
            } else {
              this.$error(msg);
            }
          });
        } else {
        }
      });
    }
  },
  watch: {
    formData (val) {
      console.log(val);
      this.$refs.formValidate.resetFields();
      if (Object.keys(val).length > 0) {
        const weekArr = this.filtersWeek(val.weeks, 1);
        this.formValidate.startTime = val.startTime;
        this.formValidate.endTime = val.endTime;
        this.formValidate.weeks = weekArr;
        this.formValidate.id = val.id || '';
      } else {
        this.formValidate = {
          startTime: '',
          endTime: '',
          weeks: [],
          id: ''
        };
      }
    }
  }
};
</script>

<style lang="less">
  .checkboxMain{
    .ivu-checkbox{
      vertical-align: text-bottom !important;
    }
  }
</style>
