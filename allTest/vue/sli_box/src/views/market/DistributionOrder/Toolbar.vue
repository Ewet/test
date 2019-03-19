<template>
    <Form ref="formInline"  inline class="toolBarForm">
      <RefreshBtn @click="reload"/>
        <FormItem label="创建时间" class="datePicker">
         <DatePicker
         v-model="filterObj.create_time"
         type="datetimerange" format="yyyy-MM-dd HH:mm:ss"
         placeholder="创建时间"
         style="width: 300px"></DatePicker>
          </FormItem>
        <FormItem label="类型">
             <Select  v-model="filterObj.select"  placeholder="请输入类型" clearable>
                <Option value="order_sn">订单号</Option>
            </Select>
        </FormItem>
        <FormItem label="关键字">
            <Input type="text" v-model="filterObj.column_value" placeholder="请输入关键字"></Input>
        </FormItem>
        <FormItem>
            <SearchBtn @click="handleSubmit"/>
            <ResetBtn @click="handleReset"/>
        </FormItem>
    </Form>
</template>
<script>
import fecha from 'fecha';
import vuexMixins from 'mixins/module-map';
import { STORE_NAME } from './store';

export default {
  mixins: [vuexMixins({ moduleName: STORE_NAME })],
  name: 'DistributionOrderToolbar',
  data () {
    return {
      filterObj: {
        column_value: '',
        select: '',
        create_time: []
      }
    };
  },
  methods: {
    handleSubmit (name) {
      let startTime = '';
      let endTime = '';
      const createTime = this.filterObj.create_time;
      if (createTime.length && createTime.every(x => !!x) > 0) {
        startTime = fecha.format(createTime[0], 'YYYY-MM-DD HH:mm:ss');
        endTime = fecha.format(createTime[1], 'YYYY-MM-DD HH:mm:ss');
      }
      this.filterData({
        create_time_start: startTime,
        create_time_end: endTime,
        column_name: this.filterObj.select,
        column_value: this.filterObj.column_value
      });
    },
    handleReset () {
      this.filterObj = {
        column_value: '',
        select: '',
        create_time: []
      };
      this.clearFilter();
    }
  },
  watch: {
    'filterObj.select': function (val) {
      if (!val) {
        this.filterObj.column_value = '';
      }
    }
  }
};
</script>
