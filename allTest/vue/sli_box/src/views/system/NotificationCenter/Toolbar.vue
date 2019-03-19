
<template>
    <Form inline  class="toolBarForm">
        <FormItem  label='日期' class="datePicker">
          <DatePicker
          format="yyyy-MM-dd HH:mm:ss"
          v-model="filterObj.noticeTime"
          type="datetimerange"
          placeholder="日期"
          style="width: 300px"
          @on-clear="setNoticeTime"></DatePicker>
        </FormItem>
        <FormItem label="通知类型" prop="noticeType">
            <Select :clearable="true" v-model="filterObj.noticeType" placeholder="通知类型">
                <Option
                v-for="item in noticeTypeOptions"
                :key="item.value"
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
import { STORE_NAME } from './store';

export default {
  mixins: [vuexMixins({ moduleName: STORE_NAME })],
  name: 'NotificationCenterToolbar',
  data () {
    return {
      filterObj: {
        noticeTime: this.timeInitialize(),
        noticeType: null
      },
      noticeTypeOptions: [
        {
          value: 1,
          name: '新订单'
        },
        {
          value: 2,
          name: '挂单通知'
        },
        {
          value: 3,
          name: '退货通知'
        }
      ]
    };
  },
  methods: {
    timeInitialize () {
      const time = new Date().getTime();
      const time2 = new Date().setHours(0, 0, 0, 0);
      const end = (24 * 60 * 60 * 1000);
      const dt = time2 - end;
      return [new Date(dt), new Date(time)];
    },
    // 时间格式化
    timeFormat (date) {
      let startTime = '';
      let endTime = '';
      if (date.length && date.every(x => !!x) > 0) {
        startTime = this.$formatTime(date[0]);
        endTime = this.$formatTime(date[1]);
      }
      return [startTime, endTime];
    },
    setNoticeTime () {
      this.$nextTick(() => {
        this.filterObj.noticeTime = [];
      });
    },
    handleSubmit () {
      // console.log(this.timeInitialize());
      const time = this.timeFormat(this.filterObj.noticeTime);
      this.filterData(Object.assign({
        message_type: this.filterObj.noticeType,
        time_start: time[0],
        time_end: time[1]
      }));
    },
    handleReset () {
      this.filterObj = {
        noticeTime: this.timeInitialize(),
        noticeType: null
      };
      const time = this.timeFormat(this.timeInitialize());
      this.filterData({
        message_type: this.filterObj.noticeType,
        time_start: time[0],
        time_end: time[1]
      });
    }

  },
  mounted () {
    this.handleSubmit();
  },
  watch: {}
};
</script>
