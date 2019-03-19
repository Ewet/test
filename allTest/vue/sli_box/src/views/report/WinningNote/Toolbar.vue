
<template>
    <Form inline class="toolBarForm">
        <RefreshBtn @click="handleRefresh"/>
        <FormItem label='用户名称'>
            <Input type="text" @on-keydown.13="handleSubmit" v-model="filterObj.username" placeholder="用户名称" >
            </Input>
        </FormItem>
        <FormItem  prop="activityTime" class="datePicker" label='奖励时间'>
             <DatePicker v-model="filterObj.activityTime" type="datetimerange" format="yyyy-MM-dd HH:mm" placeholder="奖励时间范围"></DatePicker>
        </FormItem>
        <SearchBtn @click="handleSubmit"/>
        <ResetBtn @click="handleReset"/>
        <ExportTable @click="handleExport"/>
    </Form>
</template>

<script>
import vuexMixins from 'mixins/module-map';
import { exportTable } from 'views/report/WinningNote/model';
import { STORE_NAME } from './store';

export default {
  mixins: [vuexMixins({ moduleName: STORE_NAME })],
  data () {
    return {
      filterObj: {
        username: '',
        activityTime: []
      }
    };
  },
  methods: {
    // 导出表格
    handleExport () {
      const startTime = this.filterObj.activityTime[0];
      const endTime = this.filterObj.activityTime[1];
      const start = startTime === '' ? startTime : this.formatTime(startTime);
      const end = endTime === '' ? endTime : this.formatTime(endTime);
      exportTable({
        username: this.trim(this.filterObj.username),
        start_time: start,
        end_time: end
      });
    },
    // 去掉字符串两边空格
    trim (str) {
      if (str) {
        return str.replace(/(^\s*)|(\s*$)/g, '');
      }
      return str;
    },
    // 查询
    handleSubmit () {
      const startTime = this.filterObj.activityTime[0];
      const endTime = this.filterObj.activityTime[1];
      const start = startTime === '' ? startTime : this.formatTime(startTime);
      const end = endTime === '' ? endTime : this.formatTime(endTime);
      this.filterData({
        username: this.trim(this.filterObj.username),
        start_time: start,
        end_time: end
      });
    },
    // 重置
    handleReset () {
      this.filterObj = {
        username: '',
        activityTime: ['', '']
      };
      this.clearFilter();
    },
    // 刷新
    handleRefresh () {
      this.reload();
    },
    // 时间格式化
    formatTime (timeObj) {
      const date = new Date(timeObj);
      const Y = date.getFullYear();
      const M = this.transformation(date.getMonth() + 1);
      const D = this.transformation(date.getDate());
      const h = this.transformation(date.getHours());
      const m = this.transformation(date.getMinutes());
      const s = this.transformation(date.getSeconds());
      const str = `${Y}-${M}-${D} ${h}:${m}:${s}`;
      return str;
    },
    // 补零
    transformation (num) {
      return num < 10 ? `0${num}` : num;
    }
  }
};
</script>
