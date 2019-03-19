
<template>
    <Form inline class="toolBarForm">
            <RefreshBtn @click="handleRefresh"/>
        <FormItem label='运营商名称'>
            <Input type="text" @on-keydown.13="handleSubmit" v-model="filterObj.name" placeholder="运营商名称">
            </Input>
        </FormItem>
        <FormItem label='新增时间' class="datePicker">
            <DatePicker
              v-model="filterObj.creatTime"
              type="datetimerange"
              format="yyyy-MM-dd HH:mm"
              placeholder="新增时间">
             </DatePicker>
        </FormItem>
        <FormItem>
          <SearchBtn @click="handleSubmit"/>
          <ResetBtn @click="reset"/>
        </FormItem>
    </Form>
</template>

<script>
import vuexMixins from 'mixins/module-map';
import fecha from 'fecha';
import { STORE_NAME } from './store';

export default {
  mixins: [vuexMixins({ moduleName: STORE_NAME })],
  data () {
    return {
      filterObj: {
        name: '',
        creatTime: []
      }
    };
  },
  methods: {
    // 去掉字符串两边空格
    trim (str) {
      if (str) {
        return str.replace(/(^\s*)|(\s*$)/g, '');
      }
      return str;
    },
    // 查询
    handleSubmit () {
      let startTime = '';
      let endTime = '';
      const creatTime = this.filterObj.creatTime;
      if (creatTime.length && creatTime.every(x => !!x) > 0) {
        startTime = fecha.format(creatTime[0], 'YYYY-MM-DD HH:mm:ss');
        endTime = fecha.format(creatTime[1], 'YYYY-MM-DD HH:mm:ss');
      }
      this.filterData({
        name: this.trim(this.filterObj.name),
        start_time: startTime,
        end_time: endTime
      });
    },
    // 重置
    reset () {
      this.filterObj = {
        name: '',
        creatTime: []
      };
      this.clearFilter();
    },
    // 刷新
    handleRefresh () {
      this.reload();
    }
  }
};
</script>
