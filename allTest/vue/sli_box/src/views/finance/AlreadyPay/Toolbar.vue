<template>
    <Form inline  class="toolBarForm">
        <RefreshBtn @click="handleSubmit"/>
        <FormItem  class="datePicker" label="提现时间">
         <DatePicker
         type="datetimerange"
         format="yyyy-MM-dd HH:mm:ss"
         placeholder="提现时间"
        v-model="filterObj.create_time"></DatePicker>
        </FormItem>
        <FormItem  label="微信昵称/手机" style="width:300px;">
            <Input type="text" v-model="filterObj.column_value" placeholder="微信昵称/手机"></Input>
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
  name: 'AlreadyPayToolbar',
  data () {
    return {
      filterObj: {
        column_value: '',
        create_time: []
      }
    };
  },
  methods: {
    handleSubmit () {
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
        column_value: this.filterObj.column_value,
        status: '2'
      });
    },
    handleReset () {
      this.filterObj = {
        column_value: '',
        create_time: []
      };
      console.log('filterObj', this.filterObj);
      this.setInternalFilter({
        status: '2'
      });
      this.clearFilter();
    }
  },
  watch: {
  //   '$route.query.status' (val) {
  //     this.handleReset();
  //   }
  }
};
</script>
