<template>
    <Form inline class="toolBarForm">
       <FormItem label="姓名">
            <Input type="text" v-model="filterObj.name" placeholder="姓名">
            </Input>
        </FormItem>
        <FormItem label="手机号">
            <Input type="text" v-model="filterObj.mobile" placeholder="手机号">
            </Input>
        </FormItem>
        <FormItem label='新增时间' class="datePicker">
          <DatePicker type="datetimerange" v-model="filterObj.createdTime" placeholder="请输入新增时间"></DatePicker>
        </FormItem>
        <FormItem label="所属商户">
            <Input type="text" v-model="filterObj.merchant" placeholder="所属商户">
            </Input>
        </FormItem>
        <FormItem>
            <SearchBtn @click="handleSubmit"/>
            <ResetBtn @click="handleReset"/>
            <ExportBtn @click="handleExcel"/>
        </FormItem>
    </Form>
</template>
<script>
import vuexMixins from 'mixins/module-map';
import { getExcel } from './model';
import { STORE_NAME } from './store';

export default {
  mixins: [vuexMixins({ moduleName: STORE_NAME })],
  name: 'PurchasingManagementToolbar',
  data () {
    return {
      filterObj: {
        name: '', // 补货员姓名
        mobile: '', // 补货员手机号
        createdTime: [], // 新增时间
        merchant: '', // 所属商户
        id: ''
      }
    };
  },
  mounted () {
  },
  methods: {
    // 导出
    handleExcel () {
      let startTiem = this.filterObj.createdTime[0] || '';
      let endTime = this.filterObj.createdTime[1] || '';
      if (startTiem && endTime) {
        startTiem = this.$formatTime(startTiem);
        endTime = this.$formatTime(endTime);
      }
      getExcel({
        name: this.filterObj.name, // 补货员姓名
        mobile: this.filterObj.mobile, // 补货员手机号
        created_time_start: startTiem, // 新增时间开始
        created_time_end: endTime, // 新增时间结束
        merchant_name: this.filterObj.merchant // 所属商户
      });
    },
    // 查询
    handleSubmit () {
      let startTiem = this.filterObj.createdTime[0] || '';
      let endTime = this.filterObj.createdTime[1] || '';
      if (startTiem && endTime) {
        startTiem = this.$formatTime(startTiem);
        endTime = this.$formatTime(endTime);
      }
      this.filterData({
        name: this.filterObj.name, // 补货员姓名
        mobile: this.filterObj.mobile, // 补货员手机号
        created_time_start: startTiem, // 新增时间开始
        created_time_end: endTime, // 新增时间结束
        merchant_name: this.filterObj.merchant // 所属商户
      });
    },
    // 最近一周时间
    getRecentTime () {
      const nowTime = new Date().setHours(0, 0, 0, 0);
      const tomorrowTime = nowTime + 24 * 60 * 60 * 1000;
      const lastTime = nowTime - 7 * 24 * 60 * 60 * 1000;
      return [this.$formatTime(lastTime), this.$formatTime(tomorrowTime)];
    },
    // 重置
    handleReset () {
      this.filterObj = {
        name: '', // 补货员姓名
        mobile: '', // 补货员手机号
        createdTime: [], // 新增时间
        merchant: '', // 所属商户
        id: ''
      };
      this.filterData({});
    }
  }
};
</script>
