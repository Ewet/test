<template>
    <Form inline class="toolBarForm">
        <RefreshBtn @click='handleSubmit'/>
       <FormItem label='客户手机'>
            <Input type="text" v-model="filterObj.mobile" placeholder="客户手机">
            </Input>
        </FormItem>
         <FormItem label='留言时间' class="datePicker">
            <DatePicker
          format="yyyy-MM-dd HH:mm:ss"
          v-model="filterObj.time"
          type="datetimerange"
          placeholder="留言时间"
          style="width: 300px"></DatePicker>
        </FormItem>
          <FormItem label='状态'>
          <Select v-model="filterObj.isRead" placeholder="状态">
                <Option
                v-for="(item,index) in statusOptions"
                :key="index"
                :label="item.name"
                :value="item.value"
                ></Option>
            </Select>
        </FormItem>
        <FormItem>
            <SearchBtn @click="handleSubmit"/>
            <ResetBtn @click="handleReset"/>
        </FormItem>
    </Form>
</template>
<script>
import vuexMixins from 'mixins/module-map';

import fecha from 'fecha';
import { STORE_NAME } from './store';

export default {
  mixins: [vuexMixins({ moduleName: STORE_NAME })],
  name: 'MessageToolbar',
  data () {
    return {
      filterObj: {
        mobile: '',
        time: [],
        isRead: ''
      },
      statusOptions: [
        {
          name: '全部',
          value: '  '
        },
        {
          name: '已读',
          value: 1
        },
        {
          name: '未读',
          value: 0
        }
      ]
    };
  },
  methods: {
    handleSubmit () {
      this.filterData({
        contact: this.filterObj.mobile,
        ...this.getCreateRange(),
        is_read: this.filterObj.isRead
      });
    },
    handleReset () {
      this.filterObj = {
        mobile: '',
        time: [],
        is_read: ''
      };
      this.clearFilter();
    },
    getCreateRange () {
      let startTime = '';
      let endTime = '';
      const createTime = this.filterObj.time;
      if (createTime.length && createTime.every(x => !!x) > 0) {
        startTime = fecha.format(createTime[0], 'YYYY-MM-DD HH:mm:ss');
        endTime = fecha.format(createTime[1], 'YYYY-MM-DD HH:mm:ss');
      }
      return {
        start_time: startTime,
        end_time: endTime
      };
    }
  }
};
</script>
